import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { UserController } from '../controllers/userController';

const userController = new UserController()

const usersRouter = async (app: FastifyInstance, options: RouteShorthandOptions) => {
  app.get('/', userController.listAll)
  app.get('/:id', userController.findById)

  app.post('/signup', userController.signUp)
  app.post('/signin', userController.signIn)

  app.patch('/:id', { preHandler: userController.verifyToken }, userController.update)
  app.delete('/:id', { preHandler: userController.verifyToken }, userController.delete)
};

export default usersRouter;