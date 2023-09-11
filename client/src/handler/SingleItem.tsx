import { NavigateFunction } from "react-router-dom";
import { RootSinglePlaylist } from "../types/SinglePlaylist";
import { RootSingleArtist } from "../types/SingleArtist";
import { ExpiredToken_BadRequest_BadOAuth } from "../types/FetchData";
import { RootArtistTopTracks } from "../types/ArtistTopTrack";
import { RootSingleAlbum } from "../types/SingleAlbum";



interface GetSingle_Playlist_Artist_ArtistAlbum_AlbumTracks {
    id: string | undefined;
    storedToken: string | null;
    navigate: NavigateFunction;
    setSingleData: React.Dispatch<React.SetStateAction<(RootSinglePlaylist | RootSingleArtist | RootSingleAlbum)[]>>;
    setArtistTopTracks: React.Dispatch<React.SetStateAction<RootArtistTopTracks[]>>;
}



const handle_get_single_playlist = async (
    {
        id,
        navigate,
        storedToken,
        setSingleData
    }: Omit<GetSingle_Playlist_Artist_ArtistAlbum_AlbumTracks, "setArtistTopTracks">
) => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ id: id, access_token: storedToken })
        }

        const response = await fetch("/get-playlist", options);
        const { data }: {data: RootSinglePlaylist | ExpiredToken_BadRequest_BadOAuth} = await response.json();
        
        if(!data || "error" in data) {
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            navigate("/");
        } else {
            setSingleData([ data ]);
        }
    } catch(error) {
        console.error(error);
    }
}


const handle_get_single_artist = async (
    {
        id,
        navigate,
        storedToken,
        setSingleData,
        setArtistTopTracks
    }: GetSingle_Playlist_Artist_ArtistAlbum_AlbumTracks
) => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ id: id, access_token: storedToken })
        }
    
        const response = await fetch("/get-artist", options);
        const { data }: {data: RootSingleArtist | ExpiredToken_BadRequest_BadOAuth} = await response.json();
        
        if(!data || "error" in data) {
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            navigate("/");
        } else {
            setSingleData([ data ]);
            handle_get_artist_top_tracks(
                {
                    id,
                    navigate,
                    storedToken,
                    setArtistTopTracks            
                }
            );
        }
    } catch(error) {
        console.error(error);
    }
}


const handle_get_artist_top_tracks = async (
    {
        id,
        navigate,
        storedToken,
        setArtistTopTracks
    }: Omit<GetSingle_Playlist_Artist_ArtistAlbum_AlbumTracks, "setSingleData">

) => {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ id: id, access_token: storedToken })
        }
    
        const response = await fetch("/get-artist-tracks", options);
        const { data }: {data: RootArtistTopTracks | ExpiredToken_BadRequest_BadOAuth} = await response.json();

        if(!data || "error" in data) {
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            navigate("/");
        } else {
            setArtistTopTracks([ data ]);
        }
    } catch(error) {
        console.error(error);
    }
}


const handle_get_single_album = async (
    {
        id,
        navigate,
        storedToken,
        setSingleData
    }: Omit<GetSingle_Playlist_Artist_ArtistAlbum_AlbumTracks, "setArtistTopTracks">
) => {
    try {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ id: id, access_token: storedToken })
        }

        const response = await fetch("/get-album", options);
        const { data }: {data: RootSingleAlbum | ExpiredToken_BadRequest_BadOAuth} = await response.json();
        
        if(!data || "error" in data) {
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            navigate("/");
        } else {
            setSingleData([ data ]);
        }
    } catch(error) {
        console.log(error);
        
    }

}


export {
    handle_get_single_playlist,
    handle_get_single_artist,
    handle_get_single_album
};