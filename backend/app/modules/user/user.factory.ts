import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';


export default () => {
  return new UserController({
    UserService: new UserService({ UserModel }),
  });
};