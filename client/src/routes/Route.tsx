import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Tracks from "../components/Collections/Tracks";
import Playlists from "../components/Collections/Playlists";
import Albums from "../components/Collections/Albums";
import Artists from "../components/Collections/Artists";

const error = <h3>No route matches to {window.location.pathname}</h3>;


const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([ 
    {
        path: "/",
        element: <Login /> 
    },    
    {
        path: "/main",
        element: <App />,
        children: [
            {
                path: "collection/tracks",
                element: <Tracks />
            },
            {
                path: "collection/playlists",
                element: <Playlists />
            },
            {
                path: "collection/artists",
                element: <Artists />
            },
            {
                path: "collection/albums",
                element: <Albums />
            },
        ]
    },    
    {
        path: "*",
        element: error
    },    

]);

export default router;