import { Link } from "react-router-dom";
export default function Navbar(){
return (
    <div>
    <div className="navbar">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    </div>
    <p className="navbarBottom"></p>
    </div>
    

);
}