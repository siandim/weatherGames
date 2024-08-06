import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav>
        <nav className="p-4">
            <Link to="/"><button className="mr-3">Home Page</button></Link>
            <Link to="/precipitation"><button className="mr-3">Precipitation</button></Link>
            <Link to="/page3"><button className="mr-3">Page 3</button></Link>
            <Link to="/memoryGame"><button className="mr-3">Memory Game</button></Link>
      </nav>
    
    </nav>
  );
}
