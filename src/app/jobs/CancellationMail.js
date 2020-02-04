import { format } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
  // Variable key
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment Canceled',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(appointment.date, "MMMM dd, yyyy 'at' HH:mm'h'"),
      },
    });
  }
}

export default new CancellationMail();
