export default function MatchCard({ match }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}>
      <h3>{match.name}</h3>
      <p>{match.venue}</p>
      <p>{match.status}</p>
    </div>
  );
}
