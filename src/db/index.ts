import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASS || '',
  database: process.env.MYSQL_DB || 'kaggle_demo',
  logging: false
});

export class BabyName extends Model {
  declare id: number;
  declare name: string;
  declare sex: string;
}

export async function initDb() {
  BabyName.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    sex: { type: DataTypes.STRING(10), allowNull: false }
  }, { sequelize, tableName: 'BabyNames', timestamps: true });

  await sequelize.authenticate();
  await sequelize.sync();
  return sequelize;
}

export { sequelize };
