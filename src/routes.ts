import { Router } from 'express'
import path from 'path'
import fs from 'fs'
export default class Routes {
    private router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        const routePath = path.join(__dirname, 'routes')
        this.loadRoutes(routePath)
    }

    private loadRoutes(routePath) {
        const items = fs.readdirSync(routePath)

        items.forEach((item) => {
            const itemPath = path.join(routePath, item)
            const stats = fs.statSync(itemPath)

            if (stats.isDirectory()) {
                this.loadRoutes(itemPath)
            } else if (stats.isFile()) {
                if (item.endsWith('.js') || item.endsWith('.ts')) {

                    if(item.toLowerCase().startsWith('root')) {
                        this.router.use('/', require(itemPath).default)
                        return;
                    }

                    const modulePath = itemPath.replace(/\.[A-z]{1,2}/gm, '')

                    const routeModule = require(modulePath).default

                    const mountPath = path
                        .relative(path.join(__dirname, 'routes'), modulePath)
                        .replace(/\\/g, '/')
                        .toLowerCase()

                    this.router.use(`/${mountPath}`, routeModule)
                }
            }
        })
    }

    public getRouter() {
        return this.router
    }
}
