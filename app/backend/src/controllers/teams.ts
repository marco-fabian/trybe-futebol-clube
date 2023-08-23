import { Request, Response } from 'express';
import TeamsService from '../services/team';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async findAllTeams(req: Request, res: Response): Promise<Response> {
    this.teamsService = new TeamsService();
    console.log('test');
    const result = await this.teamsService.findAll();
    console.log(result);
    return res.status(200).json(result.data);
  }

  public async findTeamById(req: Request, res: Response): Promise<Response> {
    return res.status(200).json((await this.teamsService.findById(+req.params.id)).data);
  }
}
