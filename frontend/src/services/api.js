const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.errors?.[0]?.msg || 'Request failed');
  }
  return data;
};

export const api = {
  auth: {
    login: (credentials) =>
      fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then(handleResponse),
    register: (userData) =>
      fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then(handleResponse),
    getMe: () =>
      fetch(`${API_BASE}/auth/me`, { headers: getHeaders() }).then(handleResponse),
    logout: () =>
      fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getHeaders(),
      }).then(handleResponse),
  },

  members: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetch(`${API_BASE}/members?${query}`, { headers: getHeaders() }).then(handleResponse);
    },
    getById: (id) =>
      fetch(`${API_BASE}/members/${id}`, { headers: getHeaders() }).then(handleResponse),
    create: (data) =>
      fetch(`${API_BASE}/members`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }).then(handleResponse),
    update: (id, data) =>
      fetch(`${API_BASE}/members/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }).then(handleResponse),
    delete: (id) =>
      fetch(`${API_BASE}/members/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      }).then(handleResponse),
    assignTrainer: (memberId, trainerId) =>
      fetch(`${API_BASE}/members/${memberId}/assign-trainer`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ trainerId }),
      }).then(handleResponse),
  },

  attendance: {
    checkin: (memberId) =>
      fetch(`${API_BASE}/attendance/checkin`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ memberId }),
      }).then(handleResponse),
    checkout: (memberId) =>
      fetch(`${API_BASE}/attendance/checkout`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ memberId }),
      }).then(handleResponse),
    getByMember: (id, params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetch(`${API_BASE}/attendance/member/${id}?${query}`, { headers: getHeaders() }).then(handleResponse);
    },
    getToday: () =>
      fetch(`${API_BASE}/attendance/today`, { headers: getHeaders() }).then(handleResponse),
  },

  payments: {
    create: (data) =>
      fetch(`${API_BASE}/payments`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }).then(handleResponse),
    getByMember: (id) =>
      fetch(`${API_BASE}/payments/member/${id}`, { headers: getHeaders() }).then(handleResponse),
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetch(`${API_BASE}/payments?${query}`, { headers: getHeaders() }).then(handleResponse);
    },
    verify: (id, status) =>
      fetch(`${API_BASE}/payments/${id}/verify`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      }).then(handleResponse),
  },

  trainer: {
    getDashboard: () =>
      fetch(`${API_BASE}/trainer/dashboard`, { headers: getHeaders() }).then(handleResponse),
    getMembers: () =>
      fetch(`${API_BASE}/trainer/members`, { headers: getHeaders() }).then(handleResponse),
    createWorkout: (data) =>
      fetch(`${API_BASE}/trainer/workout`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }).then(handleResponse),
    getWorkouts: () =>
      fetch(`${API_BASE}/trainer/workouts`, { headers: getHeaders() }).then(handleResponse),
    updateMemberProgress: (id, data) =>
      fetch(`${API_BASE}/trainer/member/${id}/progress`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }).then(handleResponse),
  },

  community: {
    getPosts: () =>
      fetch(`${API_BASE}/community/posts`, { headers: getHeaders() }).then(handleResponse),
    createPost: (data) =>
      fetch(`${API_BASE}/community/posts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      }).then(handleResponse),
    likePost: (id) =>
      fetch(`${API_BASE}/community/posts/${id}/like`, {
        method: 'POST',
        headers: getHeaders(),
      }).then(handleResponse),
    commentPost: (id, text) =>
      fetch(`${API_BASE}/community/posts/${id}/comment`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text }),
      }).then(handleResponse),
    getChallenges: () =>
      fetch(`${API_BASE}/community/challenges`, { headers: getHeaders() }).then(handleResponse),
    joinChallenge: (id) =>
      fetch(`${API_BASE}/community/challenges/${id}/join`, {
        method: 'POST',
        headers: getHeaders(),
      }).then(handleResponse),
  },

  analytics: {
    getDashboard: () =>
      fetch(`${API_BASE}/analytics/dashboard`, { headers: getHeaders() }).then(handleResponse),
    getAttendance: () =>
      fetch(`${API_BASE}/analytics/attendance`, { headers: getHeaders() }).then(handleResponse),
  },

  leaderboard: {
    get: (period) =>
      fetch(`${API_BASE}/leaderboard?period=${period || 'all'}`, { headers: getHeaders() }).then(handleResponse),
  },
};
