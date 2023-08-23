
export const allMatches = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    }
  ]
  
  export const match = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    } 
  }
  
  export const updateData = {
    homeTeamGoals: 3,
    awayTeamGoals: 1
  }
  
  export const newMatchData = {
    homeTeamId: 16, 
    awayTeamId: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2
  }
  
  export const newMatchRes = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
    inProgress: true,
  }
  
  export const reqData = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
  
  export const notFound = { message: 'Token not found' }