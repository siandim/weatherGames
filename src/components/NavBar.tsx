import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav>
      <nav className="p-4">
        <Link to="/">
          <button className="mr-3">Home Page</button>
        </Link>

        <Link to="/precip">
          <button className="mr-3">Precipitation </button>
        </Link>
        <Link to="/memoryGame">
          <button className="mr-3">Instrument</button>
        </Link>
        <Link to="/waterCycle">
          <button className="mr-3">Water Cycle</button>
        </Link>
        <Link to="/cloudGame">
          <button className="mr-3">Clouds</button>
        </Link>
      </nav>
    </nav>
  );
}
