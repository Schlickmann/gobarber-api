import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    this.belongsTo(models.User, { as: 'provider', foreignKey: 'provider_id' });
  }
}

export default Appointment;
