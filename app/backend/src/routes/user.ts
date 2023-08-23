import { Request, Router, Response } from 'express';
import TValidation from '../middlewares/Teams';
import UValidation from '../middlewares/Users';
import UserController from '../controllers/users';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.findAllUsers(req, res));

router.get(
  '/role',
  TValidation.validation,
  (req: Request, res: Response) => userController.findUserRole(req, res),
);

router.get('/:id', (req: Request, res: Response) => userController.findUserById(req, res));

router.post(
  '/',
  UValidation.validation,
  (req: Request, res: Response) => userController.findUserByEmail(req, res),
);

export default router;
