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

    return res.json(timesheet);
  }
}

export default new TimesheetController();
