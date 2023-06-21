import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (  
        <div className="nav">
            <SearchBar />
            <br></br>
            <NavLink className="nav-link" to="/home">Home</NavLink>
            <NavLink className="nav-link" to="/create">Create</NavLink>
            <NavLink  className="nav-link" to="/about">About</NavLink>
        </div>
    )
}

        