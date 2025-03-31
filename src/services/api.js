const API_URL = process.env.VUE_APP_API_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export async function fetchConfig() {
  try {
    const res = await fetch(`${API_URL}/config`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch config');

    return await res.json();
  } catch (err) {
    console.error('API error:', err);
    return null;
  }
}

export async function updateConfig(key, value, description) {
  const res = await fetch(`${API_URL}/config/${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ value, description }),
  });

  if (!res.ok) throw new Error('Failed to update config');
  return res.json();
}

export async function deleteConfig(key) {
  const res = await fetch(`${API_URL}/config/${key}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });

  if (!res.ok) throw new Error('Failed to DELETE config');
  return res.json();
}