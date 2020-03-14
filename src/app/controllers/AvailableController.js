import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import ProviderSchedule from '../models/ProviderSchedule';
import Schedule from '../models/Schedule';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) return res.status(400).json({ error: 'Date was not provided.' });

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = await ProviderSchedule.findAll({
      where: { provider_id: req.params.providerId },
      include: [
        { model: Schedule, as: 'schedule', attributes: ['id', 'time'] },
      ],
    });

    // Verifying provider's availability
    const available = schedule.map(element => {
      const [hour, minute] = element.schedule.time.split(':');

      // Formatting hour, minute and second
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time: element.schedule.time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        past: isAfter(new Date(), value),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(
            a => format(a.date, 'HH:mm') === element.schedule.time
          ),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
