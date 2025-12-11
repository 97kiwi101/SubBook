// Base URL - Matches your running backend
const API_URL = import.meta.env.VITE_API_BASE_URL; 

/**
 * Log in a user
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to login');
  }

  return data;
};

/**
 * Register a new user
 * @param {Object} userData - { email, password, name, jobTitle }
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to register');
  }

  return data;
};