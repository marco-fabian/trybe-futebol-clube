import { ITeamsModel } from '../Interfaces/ITeamsModel';
import SequelizeTeams from '../database/models/teamModel';
import ITeam from '../Interfaces/ITeam';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> { return this.model.findAll(); }
  async findById(id: ITeam['id']): Promise<ITeam | null> { return this.model.findByPk(id); }
}
