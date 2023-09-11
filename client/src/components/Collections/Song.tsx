import IonIcon from "@reacticons/ionicons";
import { SongsPropsTypes } from "../../types/ComponentPropsTypes";
import { handle_display_duration, handle_format_date } from "../../handler/Tracks";


function Songs({ index, playlistTrack, artistTrack, albumTrack, item }: SongsPropsTypes) {



    return(
        <li 
            key={playlistTrack?.track.id} 
            className={`Song ${albumTrack && "Album_Song"}`}
        
        >
            <div className="First_Column">{index + 1}</div>    

            <div className="Second_Column">
                <img 
                    alt="" 
                    src={
                        item 
                        ? item.track.album.images[0].url
                        : playlistTrack 
                        ? playlistTrack.track.album.images[0].url
                        : artistTrack 
                        ? artistTrack.album.images[0].url
                        : ""
                    } 
                />
                <span>
                    <p>
                        { item?.track.name }
                        { playlistTrack?.track.name }
                        { artistTrack?.name }
                        { albumTrack?.name }
                    </p> 
                    <p>
                        { playlistTrack?.track.artists[0].name}
                        { artistTrack?.artists[0].name }
                        { albumTrack?.artists[0].name }
                    </p>   
                </span> 
            </div>

            <div className="Third_Column">
                { item?.track.album.name }
                { playlistTrack?.track.album.name }
                { artistTrack?.album.name }
            </div>
            { !albumTrack && (
                <div className="Fourth_Column">
                    { 
                        item
                        ? handle_format_date(item.added_at)
                        : playlistTrack 
                        ? handle_format_date(playlistTrack.added_at) 
                        : artistTrack 
                        ? handle_format_date(artistTrack.album.release_date) 
                        : "Unknown"
                    }
                </div>
            )}

            <div className="Fifth_Column">
                <IonIcon name="heart" />
                <p>
                    { handle_display_duration(item?.track.duration_ms ?? null) }
                    { handle_display_duration(playlistTrack?.track.duration_ms ?? null) }
                    { handle_display_duration(artistTrack?.duration_ms ?? null) }
                    { handle_display_duration(albumTrack?.duration_ms ?? null) }
                </p>
            </div>
        </li>
    )
} 



export default Songs;