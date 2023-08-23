import LeaderBoard from '../middlewares/Leaderboard';

export default class BoardService {
  private leaderBoard = new LeaderBoard();
  async getBoard() {
    const data = await this.leaderBoard.getLeaderBoard();

    return { status: 'SUCCESSFUL', data };
  }

  async getAwayBoard() {
    const data = await this.leaderBoard.getAwayLeaderBoard();

    return { status: 'SUCCESSFUL', data };
  }

  async getHomeBoard() {
    const data = await this.leaderBoard.getHomeLeaderBoard();

    return { status: 'SUCCESSFUL', data };
  }
}
