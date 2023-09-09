import { NavigateFunction } from "react-router-dom";
import { ExpiredToken_BadRequest_BadOAuth } from "../types/FetchData";
import { RootPlayLists } from "../types/Playlists";

interface FetchPlaylistsParamTypes {
    storedToken: string | null,
    navigate: NavigateFunction,
    setPlaylists: React.Dispatch<React.SetStateAction<RootPlayLists[]>>
} 


const handle_fetch_playlists = async (
    {storedToken, navigate, setPlaylists}: FetchPlaylistsParamTypes
) => {
    const option: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ access_token: storedToken })
    }

    const response = await fetch("/get-playlists", option);
    const { data }: { data: RootPlayLists | ExpiredToken_BadRequest_BadOAuth } = await response.json();
    
    if(!data || "error" in data) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
        return;
    } else {
        setPlaylists([ data ]); 
    }
}




export { 
    handle_fetch_playlists,
};