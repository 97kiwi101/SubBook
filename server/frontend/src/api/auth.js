// If the variable is missing, default to localhost:5000 (or whatever your backend port is)
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/';

// Helper to handle responses safely
const handleResponse = async (response) => {
  if (response.status === 204) return { success: true };
  
  if (!response.ok) {
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `Error ${response.status}`);
    } catch (e) {
      console.error("Server Error:", text);
      throw new Error(`Server Error: ${response.status}`);
    }
  }
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};