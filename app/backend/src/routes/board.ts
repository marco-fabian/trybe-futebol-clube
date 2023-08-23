import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboard';

const router = Router();
const controller = new LeaderBoardController();

router.get('/', (req, res) => controller.getGeneral(req, res));
router.get('/away', (req, res) => controller.getHomeInformation(req, res));
router.get('/home', (req, res) => controller.getAwayInformation(req, res));

export default router;
