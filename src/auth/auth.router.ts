import { Hono } from 'hono';
import { login } from './auth.controller';

const authRoutes = new Hono();

authRoutes.post('/login', login);

export default authRoutes;