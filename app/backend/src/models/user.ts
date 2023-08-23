import SequelizeUser from '../database/models/userModel';
import UserInterface from '../Interfaces/User';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private result = SequelizeUser;

  async findAll(): Promise<UserInterface[]> {
    const data = await this.result.findAll();
    return data.map(({ id, username, role, email, password }) => (
      { id, username, role, email, password }
    ));
  }

  async findById(id: UserInterface['id']): Promise<UserInterface | null> {
    const data = await this.result.findByPk(id);
    return !data ? null : data;
  }

  async findByEmail(email: UserInterface['email']): Promise<UserInterface | null> {
    const data = await this.result.findOne({ where: { email } });
    return !data ? null : data;
  }
}
