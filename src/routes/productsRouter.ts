import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { ProductController } from '../controllers/productController';
import { UserController } from '../controllers/userController';

const productController = new ProductController()
const userController = new UserController()

const productsRouter = async (app: FastifyInstance, options: RouteShorthandOptions) => {
  app.get('/', productController.listAll)
  app.get('/:id', productController.findById)

  app.post('/', { preHandler: userController.verifyToken }, productController.create)

  app.patch('/:id', { preHandler: userController.verifyToken }, productController.update)
  app.delete('/:id', { preHandler: userController.verifyToken }, productController.delete)
}

export default productsRouter