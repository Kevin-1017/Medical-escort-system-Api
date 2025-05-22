import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { CompanionModule } from './companion/companion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'escort_system',
      autoLoadEntities: true,
      synchronize: true, // 开发环境可以设置为 true，生产环境下应关闭
    }),

    AuthModule,
    UsersModule,
    MenuModule,
    RoleModule,
    CompanionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
