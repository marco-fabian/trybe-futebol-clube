import { Request, Response } from 'express';
import MatchesService from '../services/match';
import responseHTTP from '../utils/responseHTTP';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const Bl = inProgress ? inProgress === 'true' : undefined;

    return res.status(200).json((await this.matchesService.findAll(Bl)).data);
  }

  async overMatch(req: Request, res: Response) {
    return res.status(200).json((await this.matchesService.overMatch(Number(req.params.id))).data);
  }

  async updateMatch(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    return res.status(200)
      .json((await this.matchesService.updateMatch(+id, homeTeamGoals, awayTeamGoals)));
  }

  async newMatch(req: Request, res: Response) {
    const { status, data } = await this.matchesService
      .newMatch(req.body);
    return res.status(responseHTTP(status)).json(data);
  }
}
