import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prefs, PrefsDocument } from "./prefs.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Prefs.name) private prefsModel: Model<PrefsDocument>
    ) { }
    async signup(user: User, jwt: JwtService): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            fullname: user.fullname,
            email: user.email,
            password: hash
        }
        const newUser = new this.userModel(reqBody);
        const savedUser = await newUser.save();

        const payload = { email: savedUser.email };
        const token = jwt.sign(payload);

        return {
            user: savedUser,
            token: token,
        };
        // return User + Token based on discussion
    }
    async signuporg(user: User, jwt: JwtService): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            fullname: user.fullname,
            email: user.email,
            password: hash,
            role: 'organisation'
        }
        const newUser = new this.userModel(reqBody);
        const savedUser = await newUser.save();

        const payload = { email: savedUser.email };
        const token = jwt.sign(payload);

        return {
            user: savedUser,
            token: token,
        };
        // return User + Token based on discussion
    }
    async signin(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        if (foundUser) {
            const { password } = foundUser;
            const isPasswordMatching = await bcrypt.compare(user.password, password);
            if (isPasswordMatching) {
                const payload = { email: user.email };
                return {
                    token: jwt.sign(payload),
                };
            }
            throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }
    async getOne(email): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
    async prefs(prefs: Prefs): Promise<any> {
        const existingPrefs = await this.prefsModel.findOne({ email: prefs.email }).exec();
        let updatedPrefs;
        if (existingPrefs) {
            updatedPrefs = await this.prefsModel.findByIdAndUpdate(existingPrefs._id, prefs, { new: true }).exec();
        } else {
            const newPrefs = new this.prefsModel(prefs);
            updatedPrefs = await newPrefs.save();
        }

        // Optionally, update the user's document if necessary
        const updatedUser = await this.userModel.findOneAndUpdate(
            { email: prefs.email },
            { prefs: updatedPrefs._id },  // Assuming the User schema has a reference to Prefs
            { new: true }
        ).exec();

        return updatedUser;
    }
    async verify(user: User): Promise<User> {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        if (foundUser) {
          foundUser.verified = true;
          await foundUser.save();
          return foundUser;
        } else {
          throw new Error('User not found');
        }
    }
}