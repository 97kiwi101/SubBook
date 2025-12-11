const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/"; 

export const loginUser = async (credentials) => {
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