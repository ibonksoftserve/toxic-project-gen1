import { Request, Response } from "express";
import { NotFoundError } from "../../core/api.errors";
import { SuccessResponse } from "../../core/api.response";
import { IUser } from "./user.model";
import { IUserResponse, IUserService } from "./user.service";
import { UpdateResult, DeleteResult } from 'mongodb';

interface IUserControllerProps {
  UserService: IUserService
}

export class UserController {

  UserService: IUserService;

  constructor({ UserService }: IUserControllerProps) {
    this.UserService = UserService;
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.UserService.getAllUsers();
    return new SuccessResponse<IUserResponse[]>(users).send(res)
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await this.UserService.getUserById(id);

    if (!user) {
      throw new NotFoundError('user');
    }

    return new SuccessResponse<IUserResponse>(user).send(res)
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const body: IUser = req.body;
    const result = await this.UserService.createUser(body);
    return new SuccessResponse<IUserResponse>(result).send(res)
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const body = req.body;
    const { id } = req.params;
    const user = await this.UserService.updateUser(id, body);

    if (!user) {
      throw new NotFoundError('user');
    }

    return new SuccessResponse<UpdateResult>(user).send(res)
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletedUser = await this.UserService.deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundError('user');
    }

    return new SuccessResponse<DeleteResult>(deletedUser).send(res)
  }
}
