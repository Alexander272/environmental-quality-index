import { NestFactory } from '@nestjs/core'
// import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as MongoStore from 'connect-mongodb-session'
import * as config from 'config'
import { AppModule } from './app.module'

const Store = MongoStore(session)
const store = new Store({
    collection: 'sessions',
    uri: config.get('mongoUri'),
})

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // app.useGlobalPipes(new ValidationPipe())
    app.use(
        session({
            name: 'session',
            secret: config.get('sessionSecret'),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 6, // 6 hours
            },
            store,
        })
    )
    await app.listen(process.env.PORT || config.get('port'))
}
bootstrap()
