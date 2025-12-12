const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAvailableShifts = async () => {
  const response = await fetch(`${API_URL}api/available`);
  return response.json();
};

export const getMyShifts = async (email) => {
  const response = await fetch(`${API_URL}api/user/${email}`);
  return response.json();
};

export const createShift = async (shiftData) => {
  const response = await fetch(`${API_URL}api/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shiftData),
  });
  return response.json();
};

export const releaseShift = async (shiftId, reason) => {
  const response = await fetch(`${API_URL}api/release`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId, reason }),
  });
  return response.json();
};

export const retractShift = async (shiftId) => {
  const response = await fetch(`${API_URL}api/retract`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId }),
  });
  return response.json();
};

export const coverShift = async (data) => {
  const response = await fetch(`${API_URL}api/cover`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};