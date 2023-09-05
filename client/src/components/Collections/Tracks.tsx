import IonIcon from "@reacticons/ionicons";
import { useEffect, useState, MouseEvent } from "react";
import { useNavigate, } from "react-router-dom";
import likedSongImage from "../../assets/Images/Liked song image.png";
import type { Item, RootTracks } from "../../types/Tracks";
import { SongsPropsTypes } from "../../types/ComponentPropsTypes";
import { handle_display_duration, handle_fetch_tracks, handle_format_date } from "../../handler/Tracks";
 



function Tracks() {
    const navigate = useNavigate();
    const[tracks, setTracks] = useState<Array<RootTracks>>([]);
    const storedToken = localStorage.getItem("access_token");




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
                    <IonIcon name="pause" style={{ display: "none" }} />
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
                    {
                      (!tracks || !tracks[0]) && <span className="loader"></span>
                    }
                    {
                        (tracks && tracks[0]) && tracks[0].items.map((item: Item, index: number) => {
                            return( 
                                <Songs 
                                    item={item} 
                                    index={index}
                                    key={item.track.id}
                                />
                            )
                        })
                    }
                </ul>
            </article>
        </section>
    )
} 






function Songs({ item, index }: SongsPropsTypes) {


    const handle_single_item = (e: MouseEvent<HTMLLIElement>) => {
        // console.log(item.track.id);
    }

    return(
        <li 
            className="Song" key={item.track.id}
            onClick={(e) => handle_single_item(e)}
        >
            <div className="First_Column">{index + 1}</div>    

            <div className="Second_Column">
                <img src={item.track.album.images[2].url} alt="" />
                <span>
                    <p>
                        {
                            item.track.name.length > 40 
                            ? item.track.name.substring(0, 40) + "..."
                            : item.track.name
                        }
                    </p> 
                    <p>
                        {
                            item.track.artists[0].name.length > 35 
                            ? item.track.artists[0].name.substring(0, 35) + "..."
                            : item.track.artists[0].name
                        }
                    </p>   
                </span> 
            </div>

            <div className="Third_Column">
                { 
                    item.track.album.name.length > 24 
                    ? item.track.album.name.substring(0, 24) + "..."
                    : item.track.album.name
                }
            </div>

            <div className="Fourth_Column">
                { handle_format_date(item.added_at) }
            </div>

            <div className="Fifth_Column">
                <IonIcon name="heart" />
                <p>
                    { handle_display_duration(item) }
                </p>
            </div>
        </li>
    )

} 


export default Tracks

