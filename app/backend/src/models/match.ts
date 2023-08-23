import SequelizeTeams from '../database/models/teamModel';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import SequelizeMatches from '../database/models/matchModel';
import MatchInterface from '../Interfaces/Match';

const COMMON = {
  attributes: { exclude: ['home_team_id', 'away_team_id'] },
  include: [
    { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
};

export default class MatchesModel implements Omit<IMatchesModel, 'findById'> {
  private model = SequelizeMatches;

  async findAll(): Promise<MatchInterface[]> {
    return this.model.findAll({ ...COMMON });
  }

  async findByProgress(inProgress: boolean): Promise<MatchInterface[]> {
    return this.model.findAll({ ...COMMON, where: { inProgress } });
  }

  async overMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async newMatch(match: MatchInterface) {
    return await this.model.create(match) as MatchInterface;
  }
}
