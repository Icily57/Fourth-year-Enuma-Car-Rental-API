import { Context } from 'hono';
import { authenticateUser, authorizeUser } from './auth.service';

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();
  const user = await authenticateUser(email, password);
  if (!user) return c.json({ message: 'Invalid credentials' }, 401);

  if (user.role === 'admin' && !authorizeUser(user, 'admin')) {
    return c.json({ message: 'Unauthorized' }, 403);
  }

  return c.json({ message: 'Login successful', user: { email: user.email, role: user.role } });
};