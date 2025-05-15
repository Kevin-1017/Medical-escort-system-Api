import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres', // 数据库类型
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'your_username',
    //   password: 'your_password',
    //   database: 'your_database',
    //   entities: [User],
    //   synchronize: true, // 开发环境可以设置为 true，生产环境下应关闭
    // }),
    // TypeOrmModule.forFeature([User]), // 注册实体
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
