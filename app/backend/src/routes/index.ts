import e = require('express');
import teamsRouter from './team';
import userRouter from './user';
import matchesRouter from './match';
import boardRouter from './board';

const router = e.Router();
router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', boardRouter);

export default router;
