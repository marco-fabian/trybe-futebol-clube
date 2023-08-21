import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  
  export default class TeamModel extends Model<InferAttributes<TeamModel>,
  InferCreationAttributes<TeamModel>> {
    declare id: CreationOptional<number>;
    declare teamName: string;
  }
  
  TeamModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  });