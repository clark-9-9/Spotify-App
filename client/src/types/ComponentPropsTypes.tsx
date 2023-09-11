import { Item } from "./Tracks";
import { Track } from "./ArtistTopTrack";
import { Item as SinglePlaylistItem} from "./SinglePlaylist";
import { Item as SingleAlbumItem } from "./SingleAlbum";


export interface SongsPropsTypes {
    index: number, 
    item?: Item
    playlistTrack?: SinglePlaylistItem, 
    artistTrack?: Track, 
    albumTrack?: SingleAlbumItem
} 

