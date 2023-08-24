import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";


const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([ 
    {
        path: "/",
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