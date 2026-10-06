/**
 * Server-Side Authentication Business Rules & Validation
 * Centralizes all validation logic on the backend.
 */

export const validateRegisterInput = ({ name, email, password, role, phone }) => {
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Full name is required');
  } else if (name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long');
  } else if (name.trim().length > 70) {
    errors.push('Full name cannot exceed 70 characters');
  }

  // Email validation & format rule
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email address is required');
  } else if (!emailRegex.test(email.trim())) {
    errors.push('Please enter a valid email address');
  }

  // Password business rules (minimum 6 characters)
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Role validation rule
  const allowedRoles = ['patient', 'doctor'];
  if (role && !allowedRoles.includes(role)) {
    errors.push(`Invalid role specified. Allowed roles are: ${allowedRoles.join(', ')}`);
  }

  // Phone validation (if provided)
  if (phone && typeof phone === 'string' && phone.trim().length > 0) {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneRegex.test(phone.trim())) {
      errors.push('Please enter a valid phone number format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLoginInput = ({ email, password }) => {
  const errors = [];

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email address is required');
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
