import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { UserController } from '../controllers/userController';

const userController = new UserController()

const usersRouter = async (app: FastifyInstance, options: RouteShorthandOptions) => {
  app.get('/', userController.listAll)
  app.get('/:id', userController.findById)

  app.post('/signup', userController.signUp)
  app.post('/signin', userController.signIn)

  app.patch('/:id', userController.update)
  app.delete('/:id', userController.delete)
};

export default usersRouter;