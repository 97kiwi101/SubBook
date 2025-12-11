const API_URL = import.meta.env.VITE_API_BASE_URL;

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
      throw new Error(`Server Error: ${response.status}`); // Likely 404 here
    }
  }
  return response.json();
};

export const getAvailableShifts = async () => {
  const response = await fetch(`${API_URL}api/available`);
  return handleResponse(response);
};

export const getMyShifts = async (email) => {
  const response = await fetch(`${API_URL}api/user/${email}`);
  return handleResponse(response);
};

export const createShift = async (shiftData) => {
  // If you still get 404, check if this should be 'api/shifts/create'
  const response = await fetch(`${API_URL}api/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shiftData),
  });
  return handleResponse(response);
};

export const releaseShift = async (shiftId, reason) => {
  const response = await fetch(`${API_URL}api/release`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId, reason }),
  });
  return handleResponse(response);
};

export const retractShift = async (shiftId) => {
  const response = await fetch(`${API_URL}api/retract`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId }),
  });
  return handleResponse(response);
};

export const coverShift = async (data) => {
  const response = await fetch(`${API_URL}api/cover`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};