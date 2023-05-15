import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule { }
