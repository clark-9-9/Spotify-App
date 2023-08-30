import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import App from "../App";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([ 
    {
        path: "/",
        element: <Login />
    },    
    {
        path: "/main",
        element: <App />
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