import { pool } from "../config/db.js";


export default async function userRoutes(fastify, options) {
  // GET all users
  fastify.get('/', async (req, reply) => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  });

  // POST create user
  fastify.post('/', async (req, reply) => {
    const { name, email } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return rows[0];
  });
}
