import { IMatchesModel } from '../Interfaces/IMatchesModel';
import { ServiceResponseError } from '../Interfaces/ServiceResponseError';
import MatchInterface from '../Interfaces/Match';
import MatchesModel from '../models/match';

export default class MatchesService {
  constructor(private matchesModel: Omit<IMatchesModel, 'findById'> = new MatchesModel()) {}

  async findAll(inProgress?: boolean): Promise<ServiceResponseError<MatchInterface[]>> {
    return inProgress === undefined
      ? { status: 'SUCCESSFUL', data: await this.matchesModel.findAll() }
      : { status: 'SUCCESSFUL', data: await this.matchesModel.findByProgress(inProgress) };
  }

  async overMatch(id: number): Promise<ServiceResponseError<{ message: string }>> {
    await this.matchesModel.overMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<ServiceResponseError<{ message: string }>> {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Match Score updated successfully' } };
  }

  async newMatch(match: MatchInterface): Promise<ServiceResponseError<MatchInterface>> {
    const newMatch = { ...match, inProgress: true };
    return { status: 'OK', data: await this.matchesModel.newMatch(newMatch) };
  }
}
