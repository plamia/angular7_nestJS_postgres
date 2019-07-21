import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from './UserService';
import { Injectable } from '@nestjs/common';
import { User } from './UserEntity';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService ) { }


    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user:User): Promise<any | {status: number}> {
        return this.validate(user).then( (userData) => {
            if(!userData) {
                return {status: 404}
            }

            let payload = `${userData.name}${userData.id}`;
            const accessToken = this.jwtService.sign(payload);

            return {
                expires_in: 3600,
                access_token: accessToken,
                user_id: payload,
                status: 200
            };
        });
    }
    

    public async register(user: User): Promise<any> {
        return await this.userService.create(user);
    }

}
