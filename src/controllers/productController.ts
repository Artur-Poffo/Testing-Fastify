import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient()

export class ProductController {
  async listAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await prisma.product.findMany()

      return { products }
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on get products list", data: err })
    }
  }

  async findById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params

      const product = await prisma.product.findFirst({ where: { id: Number(id) } })

      if (product) {
        return reply.status(200).send({ success: true, message: "Product Found", data: product })
      }

      return reply.status(404).send({ success: false, message: "Error on find this product" })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error, please enter a valid ID and try again", data: err })
    }
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const createProductSchema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        user_id: z.number()
      })

      const { name, description, price, user_id } = createProductSchema.parse(req.body)

      await prisma.product.create({
        data: {
          name,
          description,
          price,
          user_id
        }
      })

      return reply.status(201).send({ success: true, message: "Successfully created" })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on create a new product", data: err })
    }
  }

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const updateProductSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
      })

      const { name, description, price } = updateProductSchema.parse(req.body)

      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price
        }
      })

      return reply.status(200).send({ success: true, message: "Product updated successfully", data: product })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error updating product", data: err })
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params

      const product = await prisma.product.delete({ where: { id: Number(id) } })

      return reply.status(200).send({ success: true, message: "Product deleted successfully", data: product })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on delete product", data: err })
    }
  }
}