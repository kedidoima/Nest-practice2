import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';

@Injectable()
export class UserService {
    private users = [
        { "id" : "1" , "name" : "hung" , "age": 20},
        { "id" : "2" , "name" : "hung" , "age": 21},
    ]
    async getAll()  {
        return this.users;
    }

    async getById(id :string) {
        const user = this.users.find((user) => {
            return user.id === id;
        })
        if (!user) {
            throw new HttpException("User not found",404);
        }
        return user;
    }

    addUser(user: CreateUserDto) {
        this.users.push(user);
        return this.users;
    }
}
