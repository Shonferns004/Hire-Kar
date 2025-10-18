import Fastify from 'fastify';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(userRoutes, { prefix: '/api/users' });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
