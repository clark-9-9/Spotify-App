import IonIcon from "@reacticons/ionicons";
import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import likedSongImage from "../../assets/Images/Liked song image.png";
import type { Item, RootTracks } from "../../types/Tracks";
import Songs from "./Song";
import { handle_fetch_tracks } from "../../handler/Tracks";
  



function Tracks() {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("access_token");
    const[tracks, setTracks] = useState<Array<RootTracks>>([]);


    
    useEffect(() => {
        handle_fetch_tracks({ navigate, setTracks, storedToken }); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="Tracks_Container">
            <article className="Header_Rectangle_Container">
                <div className="Header_Content">
                    <img src={likedSongImage} alt="" className="Profile_Image"/>

                    <span className="Song_Titles">
                        <p>Playlist</p>
                        <p>Liked Songs</p>
                        <p>{(tracks[0] && tracks[0]) ? tracks[0].items.length : "00"} songs</p>
                    </span>
                </div>
            </article>
            
            <article className="Pause_Play_Like_Follow_Container">
                <button className="Pause_play_Btn">
                    <IonIcon name="pause" />
                    <IonIcon name="play" />
                </button>

                <div className="Follow_Liked_Btn">
                    <span className="Follow">Following</span>
                    <IonIcon name="heart" />
                </div>  

                <IonIcon name="ellipsis-horizontal" />
            </article>

            <article className="List_Of_Songs_Container">
                <header className="Header_List_Of_Songs">
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <p>Date added</p>
                    <p>Time</p>
                </header>

                <ul className="Songs_List">
                    { (!tracks || !tracks[0]) && <span className="loader"></span> }
                    
                    {
                        (tracks && tracks[0]) && tracks[0].items.map((item: Item, index: number) => {
                            return( 
                                <Songs 
                                    key={item.track.id}
                                    item={item} 
                                    index={index}
                                />
                            )
                        })
                    }
                </ul>
            </article>
        </section>
    )
} 





export default Tracks

