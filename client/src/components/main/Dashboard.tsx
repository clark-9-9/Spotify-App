import { Outlet, useLocation } from "react-router-dom";
import homePageIllustration from "../../assets/Home_Page_illustration.svg";


function Dashboard() {
    const location = useLocation();

    return (
        <section className="Dashboard">
            {location.pathname === "/main" && <img className="homePageIllustration" src={homePageIllustration} alt="" /> }
            <Outlet />
        </section>
    )
}



export { Dashboard };