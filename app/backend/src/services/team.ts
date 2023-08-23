import ITeam from '../Interfaces/ITeam';
import { ServiceResponseError } from '../Interfaces/ServiceResponseError';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModel from '../models/team';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) {}

  public async findAll(): Promise<ServiceResponseError<ITeam[]>> {
    const result = await this.teamsModel;
    console.log(result);
    return { status: 'SUCCESSFUL', data: await this.teamsModel.findAll(),
    };
  }

  public async findById(id: number): Promise<ServiceResponseError<ITeam>> {
    return { status: 'SUCCESSFUL', data: await this.teamsModel.findById(id) as ITeam };
  }
}
