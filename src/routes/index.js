import { Router } from 'express'

import { usersRoutes } from './users.routes.js'
import { sessionsRoutes } from './sessions.routes.js'

export const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)