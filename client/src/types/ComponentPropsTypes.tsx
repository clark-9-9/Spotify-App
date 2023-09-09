import { Item } from "./Tracks";
import { Track } from "./ArtistTopTrack";


export interface TopSidebarTypes {
    changeHomeIconAndState: {
        changeHomeIcon: boolean; 
        setChangeHomeIcon: React.Dispatch<React.SetStateAction<boolean>>;
    };

    changeSearchIconAndState: {
        changeSearchIcon: boolean; 
        setChangeSearchIcon: React.Dispatch<React.SetStateAction<boolean>>;
    }
}
 

export interface SongsPropsTypes {
    index: number, 
    item?: Item, 
    track?: Track, 
} 

