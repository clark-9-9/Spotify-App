import { NavigateFunction } from "react-router-dom";
import { RootArtists } from "../types/Artists";
import { ExpiredToken_BadRequest_BadOAuth } from "../types/FetchData";


interface FetchArtistsParamsTypes {
    storedToken: string | null,
    navigate: NavigateFunction,
    setArtists: React.Dispatch<React.SetStateAction<RootArtists[]>>
}


const handle_fetch_artists = async (
    { storedToken, navigate, setArtists}: FetchArtistsParamsTypes
) => {
    const options: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ access_token: storedToken })
    }

    const response = await fetch("/get-artists", options);
    const { data }: { data: RootArtists | ExpiredToken_BadRequest_BadOAuth } = await response.json();
    
    if(!data || "error" in data) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    } else {
        setArtists([ data ]);
    }
}




export {
    handle_fetch_artists
};