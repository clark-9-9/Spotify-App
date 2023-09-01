import {
    playlists, 
    songs, 
    madeForYou, 
    artists, albums
} from "../svg/Sidebar";



const userCollections = [
    {
        to: "/main/collection/tracks",
        text: "Songs",
        icon: songs("Collection_Svg Songs")
    },
    {
        to: "/main/collection/playlists",
        text: "Playlists",
        icon: playlists("Collection_Svg Playlists")
    },
    {
        to: "/main/collection/artists",
        text: "Artists",
        icon: artists("Collection_Svg Artists")
    },
    {
        to: "/main/collection/albums",
        text: "Albums",
        icon: albums("Collection_Svg Albums")
    },
    {
        to: "/*",
        text: "Made For You",
        icon: madeForYou("Collection_Svg Made_For_You")
    },
]


export { userCollections };