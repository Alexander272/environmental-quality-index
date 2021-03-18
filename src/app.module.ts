import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import * as config from 'config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { IndicatorsModule } from './indicators/indicators.module'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client', 'build'),
            renderPath: 'app',
            exclude: ['/api*'],
        }),
        MongooseModule.forRoot(config.get('mongoUri')),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true,
            debug: true,
            path: '/api/graphql',
        }),
        UsersModule,
        IndicatorsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
