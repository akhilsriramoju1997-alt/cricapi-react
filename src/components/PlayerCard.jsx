export default function PlayerCard({ p }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>
      <h4>{p.name}</h4>
      <p>{p.country}</p>
    </div>
  );
}
