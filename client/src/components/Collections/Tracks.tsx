import IonIcon from "@reacticons/ionicons";
import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import likedSongImage from "../../assets/Images/Liked song image.png";
import type { Item, RootTracks } from "../../types/Tracks";
import { SongsPropsTypes } from "../../types/ComponentPropsTypes";
 
function Tracks() {
    const navigate = useNavigate();
    const[tracks, setTracks] = useState<Array<RootTracks>>([]);
    const storedToken = localStorage.getItem("access_token");
    const taylorSwift = "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg";


    const handle_fetch_tracks = async () => {
        const response = await fetch("/get-tracks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ access_token: storedToken })
        });

        const { data }: { data: RootTracks }  = await response.json();
        console.log(data);
        
        if(!data || "error" in data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
            return;
        } else {
            setTracks([ data ]);
        }
    }


    useEffect(() => {
        handle_fetch_tracks(); 
    }, [])
 

    return (
        <section className="Tracks_Container">
            <article className="Header_Rectangle_Container">
                <div className="Header_Content">
                    <img src={likedSongImage} alt="" className="Profile_Image"/>

                    <span className="Song_Titles">
                        <p>Playlist</p>
                        <p>Liked Songs</p>
                        <p>{tracks[0].items.length} songs</p>
                    </span>
                </div>
            </article>
            
            <article className="Pause_Play_Like_Follow_Container">
                <button className="Pause_play_Btn">
                    <IonIcon name="pause" style={{ display: "none" }} />
                    <IonIcon name="play" />
                </button>

                <div className="Follow_Liked_Btn">
                    <span style={{ display: "none" }}>Following</span>
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



interface FormatDuration {
    hours: number;
    minutes: number;
    seconds: number;
}   



function Songs({ item, index }: SongsPropsTypes) {


    const handle_format_date = (inputDate: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        };
        return new Date(inputDate).toLocaleDateString("US", options);
    }

    const formatDuration = (duration: number): FormatDuration => {
        const seconds = Math.floor(duration / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return { hours, minutes, seconds: remainingSeconds };
    }

    const displayDuration = (): string => {
        let str = "";
        const duration = formatDuration(item.track.duration_ms);
        if(duration.hours !== 0) str += duration.hours + ":";
        if(duration.minutes !== 0) str += duration.minutes + ":";
        if(duration.seconds < 10) str += 0;
        if(duration.seconds !== 0) str += duration.seconds;
        return str
    }
      

    return(
        <li className="Song" key={item.track.id}>
            <p>{index + 1}</p>    
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
            <p>
                {
                    item.track.album.name.length > 24 
                    ? item.track.album.name.substring(0, 24) + "..."
                    : item.track.album.name
                }
            </p>
            <p>
                {
                    handle_format_date(item.added_at)
                }
            </p>
            <div className="Last_Column">
                <IonIcon name="heart" />
                <p>
                    { displayDuration() }
                </p>
            </div>
        </li>
    )

} 


export default Tracks



/* 

    const handle_fetch_playlists = async () => {
        const response = await fetch("/get-playlists", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ access_token: token })
        });

        const { data } = await response.json();
        console.log(data);

        if(!data || "error" in data) return navigate('/');        
        setPlaylists(data);
    }

*/