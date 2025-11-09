export const BACKEND_URL = "https://cricapi-backend-1.onrender.com";

async function apiGet(path, params = {}) {
  const url = new URL(BACKEND_URL + path);

  // Add params if any
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url);
  return res.json();
}

export function getMatches() {
  return apiGet("/matches");
}

export function getMatchInfo(id) {
  return apiGet(`/match/${id}`);
}

export function getPlayerInfo(id) {
  return apiGet(`/player/${id}`);
}

export function searchPlayers(name) {
  return apiGet("/searchPlayers", { name });
}
