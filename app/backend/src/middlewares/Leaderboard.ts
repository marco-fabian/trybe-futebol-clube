import MatchesModel from '../models/match';
import IBoardInterface from '../Interfaces/IBoard';
import TeamMatchesValidation from './TeamMatches';
import TeamModel from '../models/team';

export default class LeaderBoard {
  teams: TeamMatchesValidation[];
  private matchesModel: MatchesModel = new MatchesModel();
  private teamModel: TeamModel = new TeamModel();

  constructor() {
    this.teams = [];
  }

  addTeam(team: TeamMatchesValidation) {
    this.teams.push(team);
  }

  sortLeaderboard() {
    const params: (keyof IBoardInterface)[] = [
      'totalPoints',
      'totalVictories',
      'goalsBalance',
      'goalsFavor',
    ];

    const dataInfo = this.teams.map((team) => team.getLeaderBoard());

    return dataInfo.sort((a, b) => {
      const sorted = params.find(
        (param) => a[param] !== b[param],
      ) as keyof IBoardInterface;
      return +b[sorted] - +a[sorted];
    });
  }

  async getLeaderBoard() {
    const leaderBoard = new LeaderBoard();
    const data = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll();

    data.forEach((d) => {
      const team = new TeamMatchesValidation(d.id, d.teamName);
      leaderBoard.addTeam(team);
    });

    matches.forEach((match) => {
      if (match.inProgress === true) return;
      const homeTeam = leaderBoard.teams.find((team) => team.findId() === match.homeTeamId);
      const awayTeam = leaderBoard.teams.find((team) => team.findId() === match.awayTeamId);

      homeTeam?.matchResult(match.homeTeamGoals, match.awayTeamGoals);
      awayTeam?.matchResult(match.awayTeamGoals, match.homeTeamGoals);
    });

    return leaderBoard.sortLeaderboard();
  }

  async getHomeLeaderBoard() {
    const leaderBoard = new LeaderBoard();
    const data = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll();

    data.forEach((d) => {
      const team = new TeamMatchesValidation(d.id, d.teamName);
      leaderBoard.addTeam(team);
    });

    matches.forEach((match) => {
      if (match.inProgress === true) return;
      const homeTeam = leaderBoard.teams.find((team) => team.findId() === match.homeTeamId);

      homeTeam?.matchResult(match.homeTeamGoals, match.awayTeamGoals);
    });

    return leaderBoard.sortLeaderboard();
  }

  async getAwayLeaderBoard() {
    const leaderBoard = new LeaderBoard();
    const data = await this.teamModel.findAll();
    const matches = await this.matchesModel.findAll();

    data.forEach((d) => {
      const team = new TeamMatchesValidation(d.id, d.teamName);
      leaderBoard.addTeam(team);
    });

    matches.forEach((match) => {
      if (match.inProgress === true) return;
      const awayTeam = leaderBoard.teams.find((team) => team.findId() === match.awayTeamId);

      awayTeam?.matchResult(match.awayTeamGoals, match.homeTeamGoals);
    });

    return leaderBoard.sortLeaderboard();
  }
}
