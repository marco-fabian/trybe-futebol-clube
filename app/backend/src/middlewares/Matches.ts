import { Request, Response, NextFunction } from 'express';
import ITeam from '../Interfaces/ITeam';
import TeamModel from '../models/team';
import responseHTTP from '../utils/responseHTTP';

export default class MatchesValidation {
  static async validation(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res
        .status(responseHTTP('CONFLICT'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamModel = new TeamModel();
    const teams: ITeam[] = await teamModel.findAll();

    if (!teams.some((team) => team.id === homeTeamId)
    || !teams.some((team) => team.id === awayTeamId)) {
      return res
        .status(responseHTTP('NOT_FOUND'))
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
