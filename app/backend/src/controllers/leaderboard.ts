import { Request, Response } from 'express';
import BoardService from '../services/board';

export default class LeaderBoardController {
  constructor(
    private leaderboardService = new BoardService(),
  ) { }

  async getGeneral(_req: Request, res: Response) {
    const result = await this.leaderboardService.getBoard();
    res.status(200).json(result.data);
  }

  async getHomeInformation(_req: Request, res: Response) {
    const result = await this.leaderboardService.getAwayBoard();
    res.status(200).json(result.data);
  }

  async getAwayInformation(_req: Request, res: Response) {
    const result = await this.leaderboardService.getHomeBoard();
    res.status(200).json(result.data);
  }
}
