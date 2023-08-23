import { ICRUDModelReader } from './ICrudModel';
import MatchInterface from './Match';

export interface IMatchesModel extends ICRUDModelReader<MatchInterface> {
  findByProgress(inProgress: boolean): Promise<MatchInterface[]>
  overMatch(id: number): Promise<void>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  newMatch(match: MatchInterface): Promise<MatchInterface>
}
