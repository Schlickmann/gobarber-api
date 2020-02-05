import Sequelize, { Model } from 'sequelize';

class ProviderSchedule extends Model {
  static init(sequelize) {
    super.init(
      {
        provider_id: Sequelize.INTEGER,
        time_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'provider', foreignKey: 'provider_id' });
    this.belongsTo(models.Schedule, { as: 'schedule', foreignKey: 'time_id' });
  }
}

export default ProviderSchedule;
