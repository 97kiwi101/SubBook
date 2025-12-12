// Base URL - Matches your running backend
const API_URL = import.meta.env.VITE_API_BASE_URL; 

export const loginUser = async (credentials) => {
  // DEBUG LOG: This will print the exact URL to your browser console
  console.log("Attempting login at:", `${API_URL}api/auth/login`);

  const response = await fetch(`${API_URL}api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  // CHECK STATUS BEFORE PARSING
  if (!response.ok) {
    const text = await response.text(); // Read raw error text
    console.error("Login Failed:", text);
    throw new Error(text || `Server Error: ${response.status}`);
  }

  return response.json();
};

export const registerUser = async (userData) => {
  // DEBUG LOG: Print URL for register too
  console.log("Attempting register at:", `${API_URL}api/auth/register`);

  const response = await fetch(`${API_URL}api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Register Failed:", text);
    throw new Error(text || `Server Error: ${response.status}`);
  }

  return response.json();
};