import bcrypt from 'bcryptjs';

const users = [
  { id: 1, email: 'user@example.com', password: '$2a$10$examplehashedpassword', role: 'user' },
  { id: 2, email: 'admin@example.com', password: '$2a$10$examplehashedpassword', role: 'admin' }
];

export const authenticateUser = async (email: string, password: string) => {
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

export const authorizeUser = (user: any, role: string) => {
  return user?.role === role;
};