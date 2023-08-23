import { Router } from 'express';
import MatchesController from '../controllers/matches';
import TValidation from '../middlewares/Teams';
import MatchesValidations from '../middlewares/Matches';

const matchesController = new MatchesController();
const router = Router();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  TValidation.validation,
  (req, res) => matchesController.overMatch(req, res),
);
router.patch(
  '/:id',
  TValidation.validation,
  (req, res) => matchesController.updateMatch(req, res),
);
router.post(
  '/',
  TValidation.validation,
  MatchesValidations.validation,
  (req, res) => matchesController.newMatch(req, res),
);

export default router;
