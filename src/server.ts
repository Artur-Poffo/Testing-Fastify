import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const app = fastify()
const prisma = new PrismaClient()

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()

  return { users }
})

app.post('/users', async (req, reply) => {
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
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => console.log('Server Running...'));