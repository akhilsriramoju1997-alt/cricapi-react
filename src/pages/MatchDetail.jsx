import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMatchInfo } from "../api/cricapi";
import Scorecard from "../components/Scorecard";

export default function MatchDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getMatchInfo(id).then((d) => setInfo(d.data));
  }, [id]);

  if (!info) return <div>Loading...</div>;

  return (
    <div>
      <h2>{info.name}</h2>
      <Scorecard data={info} />
    </div>
  );
}
