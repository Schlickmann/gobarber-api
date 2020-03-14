import ProviderSchedule from '../models/ProviderSchedule';

class TimesheetController {
  async index(req, res) {
    const timesheet = await ProviderSchedule.findAll({
      where: { provider_id: req.userId },
    });

    return res.json(timesheet);
  }
}

export default new TimesheetController();
