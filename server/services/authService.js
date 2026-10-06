import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateRegisterInput, validateLoginInput } from '../validators/authValidator.js';

/**
 * Server Business Logic for Authentication & User Domain
 */

// Helper to sign JWT Token
const createJwtToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'medinow_secret',
    { expiresIn: '30d' }
  );
};

// Format user output (strip sensitive data)
const sanitizeUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || '',
    createdAt: user.createdAt,
  };
};

/**
 * Business Rule: Register New User
 */
export const registerUserService = async ({ name, email, password, role, phone }) => {
  // 1. Validate business rules on server
  const validation = validateRegisterInput({ name, email, password, role, phone });
  if (!validation.isValid) {
    const error = new Error(validation.errors[0]);
    error.statusCode = 400;
    error.errors = validation.errors;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 2. Check duplicate email rule
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('An account with this email address already exists');
    error.statusCode = 409;
    throw error;
  }

  // 3. Create user entity
  const newUser = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: role || 'patient',
    phone: phone ? phone.trim() : '',
  });

  // 4. Issue authorization token
  const token = createJwtToken(newUser._id);

  return {
    user: sanitizeUser(newUser),
    token,
  };
};

/**
 * Business Rule: Authenticate User
 */
export const loginUserService = async ({ email, password }) => {
  // 1. Validate business rules on server
  const validation = validateLoginInput({ email, password });
  if (!validation.isValid) {
    const error = new Error(validation.errors[0]);
    error.statusCode = 400;
    error.errors = validation.errors;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 2. Query user entity
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // 3. Verify password match
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // 4. Issue authorization token
  const token = createJwtToken(user._id);

  return {
    user: sanitizeUser(user),
    token,
  };
};

/**
 * Business Rule: Get User Profile
 */
export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User account not found');
    error.statusCode = 404;
    throw error;
  }
  return sanitizeUser(user);
};
