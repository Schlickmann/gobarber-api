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
    const { hours } = req.body;

    if (!hours) {
      return res.status(400).json({ error: 'Time was not provided.' });
    }

    const bulkTime = hours.map(hour => ({ ...hour, provider_id: req.userId }));

    try {
      const timesheet = await ProviderSchedule.bulkCreate(bulkTime);

      return res.json(timesheet);
    } catch (error) {
      return res.status(401).json({
        error:
          'Action not permitted. You cannot add duplicated hours to your timesheet.',
      });
    }
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
