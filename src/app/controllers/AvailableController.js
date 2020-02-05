import { startOfDay, endOfDay } from 'date-fns';
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

    return res.json(schedule);
  }
}

export default new AvailableController();
