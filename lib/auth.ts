import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userDb } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Access token: 1 hour
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Refresh token: 7 days

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// Нууц үг hash хийх
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Нууц үг шалгах
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT token үүсгэх
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// JWT refresh token үүсгэх
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

// JWT token шалгах
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Нэвтрэх
export async function login(username: string, password: string) {
  // Хэрэглэгч олох
  const user = await userDb.findByUsername(username);
  
  if (!user) {
    throw new Error('Хэрэглэгч олдсонгүй');
  }

  // Нууц үг шалгах
  const isValidPassword = await verifyPassword(password, user.password);
  
  if (!isValidPassword) {
    throw new Error('Нууц үг буруу байна');
  }

  // Төлөв шалгах
  if (user.status !== 'ACTIVE') {
    throw new Error('Таны эрх идэвхгүй байна');
  }

  // Сүүлийн нэвтрэлтийн огноо шинэчлэх
  await userDb.update(user.id, {
    last_login_at: new Date().toISOString()
  });

  // Token үүсгэх
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Нууц үгийг устгаад буцаах
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
}

// Бүртгүүлэх
export async function register(data: {
  email: string;
  username: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  phone?: string;
}) {
  // Email давхардсан эсэхийг шалгах
  const existingUserByEmail = await userDb.findByEmail(data.email);
  if (existingUserByEmail) {
    throw new Error('Энэ email хаяг аль хэдийн бүртгэгдсэн байна');
  }

  // Username давхардсан эсэхийг шалгах
  const existingUserByUsername = await userDb.findByUsername(data.username);
  if (existingUserByUsername) {
    throw new Error('Энэ хэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна');
  }

  // Нууц үг hash хийх
  const hashedPassword = await hashPassword(data.password);

  // Хэрэглэгч үүсгэх
  const user = await userDb.create({
    ...data,
    password: hashedPassword,
    status: 'ACTIVE'
  });

  // Token үүсгэх
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Нууц үгийг устгаад буцаах
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
}

// Хэрэглэгчийн мэдээлэл авах (token-оос)
export async function getCurrentUser(token: string) {
  const payload = verifyToken(token);
  
  if (!payload) {
    throw new Error('Token буруу эсвэл хугацаа дууссан байна');
  }

  const user = await userDb.findById(payload.userId);
  
  if (!user) {
    throw new Error('Хэрэглэгч олдсонгүй');
  }

  // Нууц үгийг устгаад буцаах
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
}

// Refresh token ашиглаад шинэ access token авах
export async function refreshAccessToken(refreshToken: string) {
  const payload = verifyToken(refreshToken);
  
  if (!payload) {
    throw new Error('Refresh token буруу эсвэл хугацаа дууссан байна');
  }

  // Хэрэглэгч идэвхтэй эсэхийг шалгах
  const user = await userDb.findById(payload.userId);
  
  if (!user || user.status !== 'ACTIVE') {
    throw new Error('Хэрэглэгч идэвхгүй байна');
  }

  // Шинэ access token үүсгэх
  const newToken = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  return {
    token: newToken
  };
}
