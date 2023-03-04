import fastify, { FastifyInstance } from "fastify";
import productsRouter from "./routes/productsRouter";
import usersRouter from "./routes/userRouter";

const app: FastifyInstance = fastify()

app.register(usersRouter, { prefix: '/users' })
app.register(productsRouter, { prefix: '/products' })

const start = async () => {
  try {
    await app.listen({
      host: '0.0.0.0',
      port: process.env.PORT ? Number(process.env.PORT) : 3333
    });
    console.log(`HTTP server listening on ${process.env.PORT || 3333}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start()