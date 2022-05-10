import { Request, Response } from "express";
import { EmailExistsError, NotFoundError, UsernameExistsError } from "../../core/api.errors";
import { SuccessResponse } from "../../core/api.response";
import { IUser, AccountStatus } from "./user.model";
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
    const { email, nickname } = body;
    const isUserExistsByEmail = await this.UserService.getUserByEmail(email);
    const isUserExistsByNickname = await this.UserService.getUserByNickname(nickname);

    if(isUserExistsByEmail) {
      throw new EmailExistsError('email');
    }

    if(isUserExistsByNickname) {
      throw new UsernameExistsError('username')
    }
    
    const result = await this.UserService.createUser(body);
    return new SuccessResponse<IUserResponse>(result).send(res);
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await this.UserService.updateUser(id, body);
    console.log(req.params)
    if (!updatedUser || !updatedUser.matchedCount) {
      throw new NotFoundError('user');
    }
    
    return new SuccessResponse<UpdateResult>(updatedUser).send(res)
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await this.UserService.updateUser(
        id, 
        {
          ...body, 
          account_status: AccountStatus.DELETED,
          account_status_change_date: Date.now(),
        }
      );
    if (!updatedUser || !updatedUser.matchedCount) {
      throw new NotFoundError('user');
    }
    
    return new SuccessResponse<UpdateResult>(updatedUser).send(res)
  }

  public async deleteUserPermanently(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletedUser = await this.UserService.deleteUser(id);

    if (!deletedUser || !deletedUser.deletedCount) {
      throw new NotFoundError('user');
    }

    return new SuccessResponse<DeleteResult>(deletedUser).send(res)
  }
}
