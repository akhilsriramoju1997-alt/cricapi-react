import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Players() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);

  const searchPlayers = async () => {
    if (!query.trim()) return;

    const res = await fetch(`http://127.0.0.1:5000/search?name=${query}`);
    const data = await res.json();
    setPlayers(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Player Search</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search player"
      />
      <button onClick={searchPlayers}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {players.map((p) => (
          <div
            key={p.id}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "10px"
            }}
          >
            <Link to={`/player/${p.id}`}>
              <b>{p.name}</b> ({p.country})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
