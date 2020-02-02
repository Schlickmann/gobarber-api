import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          // formatting the url to access user's avatar
          get() {
            return `${process.env.HOST}:${process.env.PORT}/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
