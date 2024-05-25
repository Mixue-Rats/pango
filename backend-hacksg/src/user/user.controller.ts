import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "./user.schema";
import { Prefs } from "./prefs.schema";
import { UserService } from "./user.service";
import { JwtService } from '@nestjs/jwt'

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    @Post('/signup')
    async Signup(@Res() response, @Body() user: User) {
        const newUser = await this.userService.signup(user, this.jwtService);
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }
    @Post('/signin')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userService.signin(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token)
    }
    @Post('/prefs')
    async setPrefs(@Res() response, @Body() prefs: Prefs) {
        const updatedUser = await this.userService.prefs(prefs);
        return response.status(HttpStatus.CREATED).json({
            updatedUser
        });
    }
    @Post('/verify')
    async verifyUser(@Res() response, @Body() user: User) {
        try {
        const updatedUser = await this.userService.verify(user);
        return response.status(HttpStatus.OK).json({
            updatedUser,
        });
        } catch (error) {
        return response.status(HttpStatus.NOT_FOUND).json({
            message: error.message,
        });
        }
    }
}