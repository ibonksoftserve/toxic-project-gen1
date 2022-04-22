import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { IUser } from "./user.model";
import { IUserService } from "./user.service";

interface IUserControllerProps {
  UserService: IUserService
}

export class UserController {

  UserService: IUserService;

  constructor({ UserService }: IUserControllerProps) {
    this.UserService = UserService;
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.UserService.getAllUsers();

      res.status(200).send(users);
    } catch (error) {
      // all catch error from similar place should be handled as 'Server Error' with status code 500
      // Todo: create common approach fot that
      res.status(500).send(error);
    }
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.UserService.getUserById(id);

      if (!user) {
        // Todo: here we also need common approach to return any 404 errors
        res.status(404).send({
          errors: [
            {
              code: 'resource_not_found',
              message: 'The user with specified id does not exist.',
              field: 'body'
            }
          ]
        })
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const body: IUser = req.body;

      // here should be body validation
      // Todo: needs to common approach to validate body, query and params
      if (isEmpty(body)) {
        res.status(400).send({
          errors: [
            {
              code: 'invalid_input_data',
              message: 'The data in the request could not be parsed.',
              field: 'body'
            }
          ]
        })
      }

      const result = await this.UserService.createUser(body);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body;
      const { id } = req.params;

      const user = await this.UserService.updateUser(id, body);

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedUser = await this.UserService.deleteUser(id);

      res.status(200).send(deletedUser)
    } catch (error) {
      res.status(500).send(error);
    }
  }
}