import Schedule from '../models/Schedule';

class TimesheetController {
  async index(req, res) {
    const schedule = await Schedule.findAll();

    return res.json(schedule);
  }
}

export default new TimesheetController();
