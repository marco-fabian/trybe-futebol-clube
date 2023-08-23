import TeamModel from '../models/team';
import TeamInterface from '../Interfaces/Team';

export default class TeamMatchesValidation {
  private readonly id: number;
  private teamModel: TeamModel = new TeamModel();
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private teamName = '';

  constructor(id: number, teamName?: string) {
    this.id = id;
    this.teamName = teamName || '';
  }

  getLeaderBoard() {
    return {
      name: this.teamName,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance(),
      efficiency: this.efficiency(),
    };
  }

  matchResult(goalsFavor: number, goalsOwn: number) {
    this.totalGames += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;

    if (goalsFavor > goalsOwn) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    } else if (goalsFavor < goalsOwn) {
      this.totalLosses += 1;
    } else {
      this.totalDraws += 1;
      this.totalPoints += 1;
    }
  }

  goalsBalance() {
    return this.goalsFavor - this.goalsOwn;
  }

  efficiency() {
    return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  async findTeam(): Promise<TeamInterface | null> {
    return this.teamModel.findById(this.id);
  }

  async findName() {
    const data = await this.teamModel.findById(this.id);
    this.teamName = data?.teamName || '';
    return data?.teamName;
  }

  findId(): number {
    return this.id;
  }
}
