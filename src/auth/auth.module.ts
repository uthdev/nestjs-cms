import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        // secret: config.get('JWT_KEY'),
        // signOptions: { expiresIn: config.get('JWT_EXPIRES') },
        privateKey: config.get('JWT_PRIVATE_KEY'),
        publicKey: config.get('JWT_PUBLIC_KEY'),
        signOptions: {
          expiresIn: '3h',
          issuer: 'nest-cms',
          algorithm: 'RS256',
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
})
export class AuthModule {}

// @Module({
//   imports: [
//     ConfigModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => {
//         const options: JwtModuleOptions = {
//           privateKey: configService.get('JWT_PRIVATE_KEY'),
//           publicKey: configService.get('JWT_PUB LIC_KEY'),
//           signOptions: {
//             expiresIn: '3h',
//             issuer: 'nest-cms',
//             algorithm: 'RS256',
//           },
//         };
//         return options;
//       },
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}