import * as bcrypt from 'bcryptjs';
import { ServiceResponseError } from '../Interfaces/ServiceResponseError';
import { IUserModel } from '../Interfaces/IUserModel';
import UserInterface from '../Interfaces/User';
import UserModel from '../models/user';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findAll(): Promise<ServiceResponseError<UserInterface[]>> {
    const users = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: users };
  }

  public async findById(id: number): Promise<ServiceResponseError<UserInterface>> {
    const users = await this.userModel.findById(id);
    if (!users) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };
    return { status: 'SUCCESSFUL', data: users };
  }

  public async findRole(email: string): Promise<ServiceResponseError<UserInterface>> {
    const users = await this.userModel.findByEmail(email);
    if (!users) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: users };
  }

  public async findByEmail(email: string, password: string):
  Promise<ServiceResponseError<UserInterface>> {
    const users = await this.userModel.findByEmail(email);
    if (!users || !bcrypt.compareSync(password, users.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: users };
  }
}
