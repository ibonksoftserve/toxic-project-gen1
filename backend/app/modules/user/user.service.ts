import { IUser, IUserModelType } from './user.model';
import { DeleteResult, UpdateResult } from 'mongodb';

interface IUserServiceProps {
  UserModel: IUserModelType;
}

export type IUserResponse = IUser & { _id: string };

export interface IUserService {
  UserModel: IUserModelType;
  getAllUsers: () => Promise<IUserResponse[]>;
  getUserById: (id: string) => Promise<IUserResponse | null>;
  createUser: (data: IUser) => Promise<IUserResponse>;
  updateUser: (id: string, data: IUser) => Promise<UpdateResult | null>;
  deleteUser: (id: string) => Promise<DeleteResult | null>;
}

export class UserService implements IUserService {
  UserModel: IUserModelType;

  constructor({ UserModel }: IUserServiceProps) {
    this.UserModel = UserModel;
  }

  public async getAllUsers(): Promise<IUserResponse[]> {
    return this.UserModel.find({});
  }

  public async getUserById(id: string): Promise<IUserResponse | null> {
    return this.UserModel.findOne({ _id: id });
  }

  public async createUser(data: IUser): Promise<IUserResponse> {
    return this.UserModel.create(data);
  }

  public async updateUser(id: string, data: IUser): Promise<UpdateResult | null> {
    return this.UserModel.updateOne({ _id: id }, { $set: data });
  }

  public async deleteUser(id: string): Promise<DeleteResult | null> {
    return this.UserModel.deleteOne({ _id: id });
  }
}
