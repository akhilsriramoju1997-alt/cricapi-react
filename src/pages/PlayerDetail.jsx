import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles.css";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [format, setFormat] = useState("test");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch player data
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      try {
        let res = await fetch(`http://localhost:5000/player?id=${id}`);
        if (!res.ok) res = await fetch(`http://localhost:5000/player/${id}`);
        if (!res.ok) throw new Error("Failed to load player");
        setPlayer(await res.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [id]);

  // Parse stats
  const parsed = useMemo(() => {
    const out = { batting: {}, bowling: {} };
    if (!player?.stats) return out;

    for (const s of player.stats) {
      const fn = s.fn?.trim().toLowerCase();
      const mt = (s.matchtype || "").trim().toLowerCase();
      const key = (s.stat || "").replace(/\s+/g, "").toLowerCase();
      const val = s.value?.trim?.() ?? s.value;

      const type = mt === "t20" ? "t20i" : mt;
      if (!["test", "odi", "t20i", "ipl"].includes(type)) continue;

      const bucket = fn === "bowling" ? out.bowling : out.batting;
      bucket[type] = bucket[type] || {};
      bucket[type][key] = val;
    }
    return out;
  }, [player]);

  const MAX = { runs: 16000, avg: 70, sr: 180, wkts: 600, econ: 10 };

  if (loading) return <div className="wrapper"><div className="card">Loading...</div></div>;
  if (error) return <div className="wrapper"><div className="card">Error: {error}</div></div>;
  if (!player) return null;

  const batting = parsed.batting[format] || {};
  const bowling = parsed.bowling[format] || {};

  const StatRow = ({ label, value, max }) => {
    const num = Number(String(value).replace(/[^\d.]/g, "")) || 0;
    const percent = max ? Math.min(100, (num / max) * 100) : 0;

    return (
      <div className="stat-box">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value || "-"}</div>

        {max && (
          <div className="stat-bar">
            <div
              className="stat-bar-fill"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  const formats = { test: "Tests", odi: "ODIs", t20i: "T20Is", ipl: "IPL" };

  return (
    <div className="wrapper">

      {/* HEADER */}
      <div className="card player-header">
        <img src={player.playerImg} alt="p" className="player-img" />

        <div>
          <h2>{player.name}</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="chip">{player.country}</span>
            {player.role && <span className="chip">Role: {player.role}</span>}
            {player.battingStyle && <span className="chip">Batting: {player.battingStyle}</span>}
            {player.bowlingStyle && <span className="chip">Bowling: {player.bowlingStyle}</span>}
          </div>
        </div>

        <div>
          <button className="btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</button>
        </div>
      </div>

      {/* FORMAT TABS */}
      <div className="card">
        <div className="tabs">
          {Object.keys(formats).map((f) => (
            <button
              key={f}
              className={`tab-btn ${format === f ? "tab-active" : ""}`}
              onClick={() => setFormat(f)}
            >
              {formats[f]}
            </button>
          ))}
        </div>
      </div>

      {/* BATTING + BOWLING SIDE-BY-SIDE */}
      <div className="format-row">

        {/* BATTING */}
        <div className="card">
          <div className="section-title">Batting — {formats[format]}</div>
          <div className="stats-grid">

            <StatRow label="Runs" value={batting.runs} max={MAX.runs} />
            <StatRow label="Avg" value={batting.avg} max={MAX.avg} />
            <StatRow label="SR" value={batting.sr} max={MAX.sr} />

            <StatRow label="Matches" value={batting.m} />
            <StatRow label="Innings" value={batting.inn} />
            <StatRow label="Balls" value={batting.bf} />
            <StatRow label="Highest" value={batting.hs} />
            <StatRow label="Not Outs" value={batting.no} />
            <StatRow label="100s" value={batting["100s"] || batting["100"]} />
            <StatRow label="50s" value={batting["50s"] || batting["50"]} />
            <StatRow label="4s" value={batting["4s"]} />
            <StatRow label="6s" value={batting["6s"]} />

          </div>
        </div>

        {/* BOWLING */}
        <div className="card">
          <div className="section-title">Bowling — {formats[format]}</div>
          <div className="stats-grid">

            <StatRow label="Wickets" value={bowling.wkts} max={MAX.wkts} />
            <StatRow label="Econ" value={bowling.econ} max={MAX.econ} />
            <StatRow label="Avg" value={bowling.avg} />

            <StatRow label="Matches" value={bowling.m} />
            <StatRow label="Innings" value={bowling.inn} />
            <StatRow label="Balls" value={bowling.b} />
            <StatRow label="Runs" value={bowling.runs} />
            <StatRow label="Strike Rate" value={bowling.sr} />

            <StatRow label="Best Inns" value={bowling.bbi} />
            <StatRow label="Best Match" value={bowling.bbm} />
            <StatRow label="5W" value={bowling["5w"]} />
            <StatRow label="10W" value={bowling["10w"]} />

          </div>
        </div>

      </div>
    </div>
  );
}
