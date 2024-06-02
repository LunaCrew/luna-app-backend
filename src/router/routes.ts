import express, { Application, Router, Request, Response } from 'express'
import UserController from '../controller/UserController'
import rateLimiter from '../middleware/rateLimiter'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '../../docs/swagger.json'
import auth from '../middleware/auth'

const userRouter: Router = Router()

const routes = (app: Application) => {
  app
    .use(express.json())
    .use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app
    .get('/', (_req: Request, res: Response) => {
      res.send({ status: 'API is OK!', docs: '/api/docs' })
    })

    .post(
      '/api/user',
      rateLimiter,
      UserController.createUser,
      userRouter
    )

    .get(
      '/api/user',
      auth,
      UserController.getUser,
      userRouter
    )

    .delete(
      '/api/user/:id',
      auth,
      UserController.deleteUser,
      userRouter
    )

    .post(
      '/api/auth/login',
      rateLimiter,
      UserController.login,
      userRouter
    )
}

export { routes }
