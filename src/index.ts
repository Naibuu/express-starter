import express, {
    type Application,
    type Request,
    type Response,
    type NextFunction,
} from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'

require('dotenv').config()

import Routes from './routes'

class AppError extends Error {
    constructor(
        public code: number,
        public message: string,
    ) {
        super(message)
    }
}

class App {
    public app: Application

    constructor(private port: number) {
        this.app = express()

        this.initMiddlewares()
        this.initRoutes()
        this.initErrorHandlers()
    }

    private initMiddlewares() {
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(helmet())
    }

    private initRoutes() {
        const routes = new Routes()

        this.app.use(routes.getRouter())
    }

    private initErrorHandlers() {
        // prettier-ignore
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                if (err instanceof AppError) {
                    res.status(err.code).json({ message: err.message })
                } else {
                    console.error(err.stack)

                    res.status(500).json({ message: 'Internal server error' })
                }
            },
        )

        this.app.use((req: Request, res: Response) => {
            res.status(404).json({ message: 'Not found' })
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Listening to port: http://localhost:${this.port}`)
        })
    }
}

// parse port
const port = parseInt(process.env.PORT || '8080')

const app = new App(port)

app.listen()
