import { PrismaClient } from "@prisma/client";
import { FastifyInstance, RouteShorthandOptions } from 'fastify';

const prisma = new PrismaClient()

const productsRouter = async (app: FastifyInstance, options: RouteShorthandOptions) => {
  app.get('/', async (req, reply) => {
    const products = await prisma.product.findMany()

    return { products }
  })
}

export default productsRouter