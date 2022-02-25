import { Body, Controller, Get, HttpStatus, Post, Request, Response } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService
    ){}

    @Get()
    async getAllUsers(@Request() req, @Response() res){
        await this.userService.getAll()
            .then((users) => {
                res.status(HttpStatus.OK).json(users);
            })
            .catch((err) => {
                console.log(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Get('/:id')
    async getById(@Request() req, @Response() res){
        await this.userService.getById(req.params.id)
            .then((user) => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post('/addUser')
    async addUser(@Response() res , @Body() createUserDto : CreateUserDto){
        const users = await this.userService.addUser(createUserDto);
        res.json(users);    
    }
}
