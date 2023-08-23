import { Request, Response } from 'express';
import UserService from '../services/user';
import responseHTTP from '../utils/responseHTTP';
import JWT from '../utils/JWT';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async findAllUsers(_req: Request, res: Response) {
    const serviceResponse = await this.userService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async findUserById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.userService.findById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(responseHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async findUserByEmail(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.findByEmail(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(responseHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json({ token: JWT.generateToken(email) });
  }

  public async findUserRole(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const token = authorization.split(' ')[1];
    const email = JWT.testToken(token) as string;

    const serviceResponse = await this.userService.findRole(email);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(responseHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json({ role: serviceResponse.data.role });
  }
}
