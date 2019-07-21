import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './UserEntity';
import { UserService } from './UserService';
import { AuthService } from './AuthService';
import { AuthController } from './AuthController';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secretOrPrivateKey: 'secret12356789'
    })
    ],
    controllers: [
        AuthController
    ],
    providers: [UserService, AuthService
    ]
})
export class AuthModule { }