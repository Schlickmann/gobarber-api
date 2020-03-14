import ProviderSchedule from '../models/ProviderSchedule';
import Schedule from '../models/Schedule';

class TimesheetController {
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
}

export default new TimesheetController();
