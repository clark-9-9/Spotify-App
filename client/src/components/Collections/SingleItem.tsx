import IonIcon from "@reacticons/ionicons";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainProvider";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Songs from "./Song";
import type { RootArtistTopTracks } from "../../types/ArtistTopTrack";
import { handle_get_single_playlist, handle_get_single_artist } from "../../handler/SingleItem";



function SingleItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const[searchParams] = useSearchParams();
    const paramsType = searchParams.get("type") as "playlist" | "artist";
    const[artistTopTracks, setArtistTopTracks] = useState<Array<RootArtistTopTracks>>([]);
    const[lengthOfArtistSongs, setLengthOfArtistSongs] = useState<boolean>(false);    
    const sharedContextValues = useContext(MainContext);
    const { 
        singleDataAndState: { singleData, setSingleData }  
    } = sharedContextValues;
    const storedToken = localStorage.getItem("access_token");
    
    const singleDataCheck: boolean = !!singleData && !!singleData[0];
    const artistTopTracksCheck: boolean = !!artistTopTracks && !!artistTopTracks[0];




    useEffect(() => {
        if (paramsType === "playlist") {
            handle_get_single_playlist({ id, navigate, storedToken, setSingleData });
        } else {
            handle_get_single_artist({ id, navigate, storedToken, setSingleData, setArtistTopTracks });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    

    return (
        <section 
            className="Single_Item_Container" 
            style={{
                display: !singleDataCheck ? "none" : "block"
            }}
        >
            <article className="Header_Rectangle_Container">
                <div className="Header_Content">
                    <img alt="" 
                        src={ (singleDataCheck) ? singleData[0].images[0].url: "" } 
                        className="Profile_Image"
                    />
                    <span className="Song_Titles">
                        <p> { singleDataCheck && singleData[0].type }
                        </p>
                        <p> { singleDataCheck && singleData[0].name } </p>
                        <p>
                            { 
                                (singleDataCheck) && (singleData[0].type === "playlist" && paramsType === "playlist") 
                                ? (
                                    (singleData[0]).tracks.items.length + " "
                                ) 
                                : (artistTopTracksCheck && singleDataCheck) && (singleData[0].type === "artist" && paramsType === "artist") 
                                ? (
                                    artistTopTracks[0].tracks.length + " "
                                )
                                : "00 "
                            } 
                           song
                        </p> 
                    </span>
                </div>
            </article>
            
            <article className="Pause_Play_Like_Follow_Container">
                <button className="Pause_play_Btn">
                    <IonIcon name="pause" />
                    <IonIcon name="play" />
                </button>

                <div className="Follow_Liked_Btn">
                    <span className="Follow" style={{ display: paramsType === "artist" ? "block" : "none" }}>Following</span>
                    <IonIcon name="heart" style={{ display: paramsType !== "playlist" ? "none" : "block" }} />
                </div>  

                <IonIcon name="ellipsis-horizontal" />
            </article>

            <article className="List_Of_Songs_Container">
                <header className="Header_List_Of_Songs" style={{ display: paramsType !== "playlist" ? "none" : "grid"}}>
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <p>Date added</p>
                    <p>Time</p>
                </header>

                <h2 style={{ display: paramsType === "artist" ? "block" : "none" }}>Popular</h2>

                <ul className="Songs_List">
                    { (!singleData || !artistTopTracks) && <span className="loader"></span>}
                    {
                        (singleDataCheck) && (singleData[0].type === "playlist") && (paramsType && paramsType === "playlist")  && (
                            singleData[0].tracks.items.map((item, index) => {
                                return (
                                    <Songs 
                                        key={item.track.id}
                                        index={index}
                                        item={item}
                                    />
                                )
                            })
                        )
                    }
                    {
                        (artistTopTracksCheck) && (singleDataCheck) && (singleData[0].type === "artist") && (paramsType === "artist") && (
                            artistTopTracks[0].tracks
                                .slice(0,
                                    !lengthOfArtistSongs 
                                    ? artistTopTracks[0] && Math.floor(artistTopTracks[0].tracks.length / 2)
                                    : artistTopTracks[0].tracks.length
                                )
                                .map((track, index) => {
                                    return (
                                        <Songs 
                                            key={track.id}
                                            index={index}
                                            track={track}
                                        />
                                    )
                                })
                        )
                    } 

                    <label 
                        htmlFor="See_More" 
                        style={{ display: paramsType === "artist" ? "block" : "none" }}
                        onClick={() => setLengthOfArtistSongs((prev) => !prev)}
                    >
                        see more
                    </label>
                </ul>
            </article>
        </section>
    )
}



export default SingleItem;

