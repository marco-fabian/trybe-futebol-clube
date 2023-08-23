import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeams from './teamModel';

export default class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams' },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams' },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeams.hasMany(SequelizeMatches, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeTeams.hasMany(SequelizeMatches, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});
