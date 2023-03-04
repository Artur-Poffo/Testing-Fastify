import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { ProductController } from '../controllers/productController';

const productController = new ProductController()

const productsRouter = async (app: FastifyInstance, options: RouteShorthandOptions) => {
  app.get('/', productController.listAll)
  app.get('/:id', productController.findById)

  app.post('/', productController.create)

  app.patch('/:id', productController.update)
  app.delete('/:id', productController.delete)
}

export default productsRouter