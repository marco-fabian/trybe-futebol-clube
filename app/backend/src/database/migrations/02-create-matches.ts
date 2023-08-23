import { Model, QueryInterface, DataTypes } from "sequelize";
import MatchInterface from "../../Interfaces/Match";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<MatchInterface>>("matches", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "home_team_id",
        references: {
          model: "teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "home_team_goals",
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "away_team_id",
        references: {
          model: "teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "away_team_goals",
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "in_progress",
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("matches");
  },
};