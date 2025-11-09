export default function Scorecard({ data }) {
  if (!data.innings) return <div>No scorecard available</div>;

  return (
    <div>
      {data.innings.map((inn, i) => (
        <div key={i} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px" }}>
          <h4>Innings {i + 1}</h4>
          <p>
            {inn.r} / {inn.w} ({inn.o} ov)
          </p>
        </div>
      ))}
    </div>
  );
}
