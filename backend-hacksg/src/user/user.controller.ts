import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "./user.schema";
import { Prefs } from "./prefs.schema";
import { Org } from "./org.schema";
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
        return response.status(HttpStatus.CREATED).json(
            newUser
        )
    }
    @Post('/signuporg')
    async Signuporg(@Res() response, @Body() user: User) {
        const newUser = await this.userService.signuporg(user, this.jwtService);
        return response.status(HttpStatus.CREATED).json(newUser)
    }
    @Post('/signin')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userService.signin(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token)
    }
    @Post('/prefs')
    async setPrefs(@Res() response, @Body() prefs: Prefs) {
        const updatedUser = await this.userService.prefs(prefs);
        // Call to ML
        return response.status(HttpStatus.CREATED).json(updatedUser);
    }

    @Post('/orginfo')
    async setOrg(@Res() response, @Body() org: Org) {
        const updatedUser = await this.userService.updateOrCreateOrg(org);
        // Call to ML
        return response.status(HttpStatus.CREATED).json(updatedUser);
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

    @Post('/addexp')
    async addExp(@Res() response, @Body() addExpDto: any) {
        const { email, exp } = addExpDto;
        try {
            const updatedUser = await this.userService.addExp(email, exp);
            return response.status(HttpStatus.OK).json({
                updatedUser,
            });
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({
                message: error.message,
            });
        }
    }

    @Post('/addachievement')
    async addAchievement(@Res() response, @Body() addAchievementDto: any) {
        const { email, achievementId } = addAchievementDto;
        try {
            const updatedUser = await this.userService.addAchievement(email, achievementId);
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