import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import likedSongImage from "../../assets/Images/Liked song image.png";
import IonIcon from "@reacticons/ionicons";


 
function Tracks() {
    const navigate = useNavigate();
    const[tracks, setTracks] = useState<Array<{}> | []>([]);
    const[playlists, setPlaylists] = useState<Array<{}> | []>([]);

    const handle_fetch_tracks = async () => {
        const response = await fetch("/get-tracks");
        const { data } = await response.json();
        setTracks(data);
    }

    const handle_fetch_playlists = async () => {
        const response = await fetch("/get-playlists");
        const { data } = await response.json();
        setPlaylists(data);
    }
 
    useEffect(() => {
        handle_fetch_tracks(); 
        // handle_fetch_playlists();
    }, [])


    useEffect(() => {
        console.log(tracks);   
    })



    return (
        <section className="Tracks_Container">
            <article className="Header_Rectangle_Container">
                <div className="Header_Content">
                    <img src={likedSongImage} alt="" className="Profile_Image"/>

                    <span className="Song_Titles">
                        <p>Playlist</p>
                        <p>Liked Songs</p>
                        <p>Name . 50 songs</p>
                    </span>
                </div>
            </article>
            
            <article className="Pause_Play_Like_Follow_Container">
                <button className="Pause_play_Btn">
                    <IonIcon name="pause" />
                    <IonIcon name="play" />
                </button>

                <div className="Follow_Liked_Container">

                </div>  
            </article>

            <article className="List_Of_Songs_Container">

            </article>
        </section>
    )
}




export default Tracks