const API_URL = import.meta.env.VITE_API_BASE_URL ||"http://localhost:3001/";

export const getAvailableShifts = async () => {
  // FIXED PATH: added '/shifts'
  const response = await fetch(`${API_URL}api/shifts/available`);
  if (!response.ok) throw new Error("Failed to fetch shifts");
  return response.json();
};

export const getMyShifts = async (email) => {
  // FIXED PATH: added '/shifts'
  const response = await fetch(`${API_URL}api/shifts/user/${email}`);
  if (!response.ok) throw new Error("Failed to fetch my shifts");
  return response.json();
};

export const createShift = async (shiftData) => {
  // FIXED PATH: added '/shifts'
  const response = await fetch(`${API_URL}api/shifts/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shiftData),
  });
  if (!response.ok) throw new Error("Failed to create shift");
  return response.json();
};

export const releaseShift = async (shiftId, reason) => {
  // FIXED PATH: added '/shifts'
  const response = await fetch(`${API_URL}api/shifts/release`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId, reason }),
  });
  if (!response.ok) throw new Error("Failed to release shift");
  return response.json();
};

export const retractShift = async (shiftId) => {
  // FIXED PATH: added '/shifts'
  const response = await fetch(`${API_URL}api/shifts/retract`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId }),
  });
  if (!response.ok) throw new Error("Failed to retract shift");
  return response.json();
};

export const coverShift = async (data) => {
  // FIXED PATH: added '/shifts'
  const response = await fetch(`${API_URL}api/shifts/cover`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to cover shift");
  return response.json();
};