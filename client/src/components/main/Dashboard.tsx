import { RouterProvider } from "react-router-dom";
import router from "../../routes/Route";



function Dashboard() {
    return (
        <section className="Dashboard">
            <RouterProvider router={router} />
        </section>
    )
}



export { Dashboard };