import { NavLink } from "react-router-dom";
import { home, library, search } from "../../svg/Sidebar";



function Navbar() {

    return (
        <nav className="Navbar">
            <NavLink to="/main" className="Nav_Link">
                { home("Home_Svg") }
                <p>Home</p>
            </NavLink>

            <article className="Nav_Link" >
                { search("Search_Svg") }
                <p>Search</p>
            </article>

            <NavLink 
                to="/main/collection" 
                className="Nav_Link"
            >
                {library("Library_Svg")}
                <p>Library</p>
            </NavLink>
        </nav>
    )
}




export default Navbar;