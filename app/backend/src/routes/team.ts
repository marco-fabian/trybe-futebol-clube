import e = require('express');
import TeamsController from '../controllers/teams';

const teamsRouter = e.Router();
const controller = new TeamsController();
teamsRouter.get('/', controller.findAllTeams.bind(controller));
teamsRouter.get('/:id', controller.findTeamById.bind(controller));

export default teamsRouter;
