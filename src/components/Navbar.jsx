import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#20232a", color: "white" }}>
      <Link style={{ marginRight: "15px", color: "white" }} to="/">Home</Link>
      <Link style={{ marginRight: "15px", color: "white" }} to="/matches">Matches</Link>
      <Link style={{ marginRight: "15px", color: "white" }} to="/players">Players</Link>
    </nav>
  );
}
