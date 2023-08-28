import { Fragment } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Sidebar } from "../components/main/Sidebar";
// import { Dashboard } from "../components/main/Dashboard";


const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([ 
    {
        path: "/",
        
    },    

    {
        path: "/main",
        element: (
            <Fragment>
                <Sidebar />
                {/* <Dashboard /> */}
            </Fragment>
        )
    },    
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/about",
        element: <h1>About Page</h1>
    },
    {
        path: "/blog",
        element: <h1>Blog Page</h1>
    },
]);

export default router;