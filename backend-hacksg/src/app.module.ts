import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User, UserSchema } from './user/user.schema';
import { Event, EventSchema } from './events/events.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Prefs, PrefsSchema } from './user/prefs.schema';
import { Org, OrgSchema} from './user/org.schema';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { HttpModule } from '@nestjs/axios';
import { isAuthenticated } from './app.middleware';

@Module({
  imports: [ 
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost:27017/volunteer'),
    EventsModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
      { name: Prefs.name, schema: PrefsSchema },
      { name: Event.name, schema: EventSchema },
      { name: Org.name, schema: OrgSchema }
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      })
    }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(isAuthenticated)
  //     .exclude(
  //       { path: 'api/v1/video/:id', method: RequestMethod.GET }
  //     )
  //     .forRoutes(VideoController);
  // }
}
