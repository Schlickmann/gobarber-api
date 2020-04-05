import ProviderSchedule from '../models/ProviderSchedule';
import Schedule from '../models/Schedule';

class ProviderTimesheetController {
  async index(req, res) {
    const timesheet = await ProviderSchedule.findAll({
      attributes: [],
      where: { provider_id: req.userId },
      include: [
        { model: Schedule, as: 'schedule', attributes: ['id', 'time'] },
      ],
    });

    const schedule = timesheet.map(time => ({
      id: time.schedule.id,
      time: time.schedule.time,
    }));

    return res.json(schedule);
  }

  async store(req, res) {
    const { time_id } = req.body;

    if (!time_id) {
      return res.status(400).json({ error: 'Time was not provided.' });
    }

    const timeExist = await ProviderSchedule.findOne({
      where: { time_id, provider_id: req.userId },
    });

    if (timeExist) {
      return res
        .status(401)
        .json({ error: "Time is already on provider's timesheet." });
    }

    const timesheet = await ProviderSchedule.create({
      provider_id: req.userId,
      time_id,
    });

    return res.json(timesheet);
  }

  async delete(req, res) {
    const { id } = req.params;

    const time = await ProviderSchedule.findOne({
      where: { time_id: id, provider_id: req.userId },
    });

    if (!time) {
      return res
        .status(400)
        .json({ error: "Hour does not exist on provider's timesheet" });
    }

    await time.destroy();

    return res.status(201).send();
  }
}

export default new ProviderTimesheetController();
