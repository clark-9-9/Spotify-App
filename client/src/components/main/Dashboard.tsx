import { Outlet } from "react-router-dom";


function Dashboard() {
    return (
        <section className="Dashboard">
            <Outlet />
        </section>
    )
}



export { Dashboard };