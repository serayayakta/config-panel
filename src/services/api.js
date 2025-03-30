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
