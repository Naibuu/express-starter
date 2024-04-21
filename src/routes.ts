import { Router } from 'express'

import Hello from './routes/hello'

export default class Routes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.use('/', Hello)
    }

    public getRouter() {
        return this.router
    }
}
