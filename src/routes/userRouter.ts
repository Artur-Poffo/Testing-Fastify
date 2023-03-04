import { PrismaClient } from "@prisma/client";
import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { z } from "zod";

const prisma = new PrismaClient()

const userRouter = async (app: FastifyInstance, options: RouteShorthandOptions) => {
  app.get('/', async (req, reply) => {
    try {
      const users = await prisma.user.findMany()

      return { users }
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on get users list", data: err })
    }
  })

  app.post('/', async (req, reply) => {
    try {
      const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
      })

      const { name, email, password } = createUserSchema.parse(req.body)

      await prisma.user.create({
        data: { name, email, password }
      })

      return reply.status(201).send({ success: true, message: "Successfully created" })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on create a new user", data: err })
    }
  })

  app.patch('/', async (req, reply) => {
    try {
      const updatedUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        id: z.number()
      })

      const { name, email, password, id } = updatedUserSchema.parse(req.body)

      const user = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          name,
          email,
          password
        }
      })

      return reply.status(200).send({ success: true, message: "User updated successfully", data: user })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on update user", data: err })
    }
  })

  app.delete('/', async (req, reply) => {
    try {
      const atDeleteUserSchema = z.object({
        id: z.number()
      })

      const { id } = atDeleteUserSchema.parse(req.body)

      const deletedUser = await prisma.user.delete({
        where: { id }
      })

      return reply.status(200).send({ success: true, message: "User deleted successfully", data: deletedUser })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on delete user", data: err })
    }
  })
};

export default userRouter;