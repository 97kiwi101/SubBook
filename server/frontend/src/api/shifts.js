const API_URL = 'http://localhost:3001/api/shifts';

export const getAvailableShifts = async () => {
  const response = await fetch(`${API_URL}/available`);
  return response.json();
};

export const getMyShifts = async (email) => {
  const response = await fetch(`${API_URL}/user/${email}`);
  return response.json();
};

export const createShift = async (shiftData) => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shiftData),
  });
  return response.json();
};

// [UPDATED] Accept reason
export const releaseShift = async (shiftId, reason) => {
  const response = await fetch(`${API_URL}/release`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId, reason }),
  });
  return response.json();
};

// [NEW] Retract Shift
export const retractShift = async (shiftId) => {
  const response = await fetch(`${API_URL}/retract`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shiftId }),
  });
  return response.json();
};

export const coverShift = async (data) => {
  const response = await fetch(`${API_URL}/cover`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};