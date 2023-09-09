import IonIcon from "@reacticons/ionicons";
// import { NavLink } from "react-router-dom";
import { SongsPropsTypes } from "../../types/ComponentPropsTypes";
import { handle_display_duration, handle_format_date } from "../../handler/Tracks";


function Songs({ index, item, track }: SongsPropsTypes) {



    return(
        <li key={item?.track.id} className="Song" >
            <div className="First_Column">{index + 1}</div>    

            <div className="Second_Column">
                <img 
                    alt="" 
                    src={
                        item 
                        ? item.track.album.images[0].url
                        : track 
                        ? track.album.images[0].url
                        : ""
                    } 
                
                />
                <span>
                    <p>
                        { item?.track.name }
                        { track?.name }
                    </p> 
                    <p>
                        { item?.track.artists[0].name}
                        { track?.artists[0].name }
                    </p>   
                </span> 
            </div>

            <div className="Third_Column">
                { item?.track.album.name }
                { track?.album.name }
            </div>

            <div className="Fourth_Column">
                { 
                    item 
                    ? handle_format_date(item.added_at) 
                    : track 
                    ? handle_format_date(track.album.release_date) 
                    : "Unknown"
                }
            </div>

            <div className="Fifth_Column">
                <IonIcon name="heart" />
                <p>
                    { handle_display_duration(item?.track.duration_ms ?? null) }
                    { handle_display_duration(track?.duration_ms ?? null) }
                </p>
            </div>
        </li>
    )
} 



export default Songs;