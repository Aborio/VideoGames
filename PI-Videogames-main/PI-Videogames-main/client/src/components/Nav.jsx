import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (  
        <div className="nav">
            <SearchBar />
            <NavLink to="/home"><button>Home</button></NavLink>
            <NavLink to="/create"><button>Create</button></NavLink>
        </div>
    )
}

        