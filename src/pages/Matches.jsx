import { useEffect, useState } from "react";
import { getMatches } from "../api/cricapi";
import MatchCard from "../components/MatchCard";

export default function Matches() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getMatches().then((d) => setList(d.data || []));
  }, []);

  return (
    <div>
      <h2>Matches</h2>
      {list.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
