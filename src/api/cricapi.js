export const API_KEY = process.env.REACT_APP_CRICAPI_KEY;
export const API_BASE = "https://api.cricapi.com/v1";

async function apiGet(path, params = {}) {
  const url = new URL(API_BASE + path);

  // Add API KEY
  url.searchParams.set("apikey", API_KEY);

  // Add additional parameters
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url);
  return res.json();
}

export function getMatches() {
  return apiGet("/currentMatches");
}

export function getMatchInfo(id) {
  return apiGet("/match_info", { id });
}

export function getPlayerInfo(id) {
  return apiGet("/players_info", { id });
}

export function searchPlayers(name) {
  return apiGet("/players", { search: name });
}
