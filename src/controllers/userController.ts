import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient()

export class UserController {
  async listAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await prisma.user.findMany()

      return { users }
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on get users list", data: err })
    }
  }

  async findById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params

      const searchUser = await prisma.user.findFirst({
        where: { id: Number(id) },
      })

      if (searchUser) {
        return reply.status(200).send({ success: true, message: "User Found", data: searchUser })
      }

      return reply.status(404).send({ success: false, message: "Error on find this user" })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error, please enter a valid ID and try again", data: err })
    }
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
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
  }

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params
      const updatedUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
      })

      const { name, email, password } = updatedUserSchema.parse(req.body)

      const user = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          email,
          password
        }
      })

      return reply.status(200).send({ success: true, message: "User updated successfully", data: user })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error updating user", data: err })
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = req.params

      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) }
      })

      return reply.status(200).send({ success: true, message: "User deleted successfully", data: deletedUser })
    } catch (err) {
      return reply.status(500).send({ success: false, message: "Error on delete user", data: err })
    }
  }
}