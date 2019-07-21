import { Module } from '@nestjs/common';
import { BlogModule } from './blog/BlogModule';
import { AuthModule } from './auth/AuthModule';
import { AppController } from './app.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from './app.service';

@Module({
  imports: [
    BlogModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'blog-app',
      entities: [__dirname + '/**/*Entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
