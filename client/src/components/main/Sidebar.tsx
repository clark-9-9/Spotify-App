import IonIcon from '@reacticons/ionicons';
import React, { useState, CSSProperties, useRef } from 'react';
import type { TopSidebarTypes } from '../../types/Sidebar';

import {
    home, 
    homeFilled,search, 
    searchFilled, 
    library,
    playlists, 
    songs, 
    madeForYou, 
    artists, albums
} from "../../svg/Sidebar";

import {
    handle_change_home_icon, 
    handle_change_search_icon, 
    handle_mouseover_mouseout, 
    handle_create_box, 
} from "../../handler/Sidebar";

import { 
    colorStyles, 
    homeTextStyle, 
    searchTextStyle,
    SearchInputStyle, 
    createPlaylistFolderBox
} from '../../styles/JSX_Styles/Sidebar';





function Sidebar() {
    const[changeHomeIcon, setChangeHomeIcon] = useState<boolean>(true);
    const[changeSearchIcon, setChangeSearchIcon] = useState<boolean>(false);

    return (
        <aside className="Sidebar">
            <TopSidebar 
                changeHomeIconAndState={{ changeHomeIcon, setChangeHomeIcon }}
                changeSearchIconAndState={{ changeSearchIcon, setChangeSearchIcon }}
            />

            <BottomSidebar />
        </aside>
    )
}




function TopSidebar({ changeHomeIconAndState, changeSearchIconAndState }: TopSidebarTypes) {
    const{ changeHomeIcon, setChangeHomeIcon } = changeHomeIconAndState;
    const{ changeSearchIcon, setChangeSearchIcon } = changeSearchIconAndState;


    return (
        <section className="Top_Sidebar">
            <article 
                onClick={() => handle_change_home_icon(setChangeHomeIcon, setChangeSearchIcon)} 
                onMouseOver={() => handle_mouseover_mouseout(0, colorStyles.active, !changeHomeIcon)} 
                onMouseOut={() => handle_mouseover_mouseout(0, colorStyles.inActive, !changeHomeIcon)}
            >
                { changeHomeIcon ? homeFilled("Home_Svg", { fill: homeTextStyle(changeHomeIcon).color as CSSProperties }) : home("Home_Svg") }
                <p style={homeTextStyle(changeHomeIcon)}>Home</p>
            </article>

            <article 
                onClick={() => handle_change_search_icon(setChangeHomeIcon, setChangeSearchIcon)}
                onMouseOver={() => handle_mouseover_mouseout(1, colorStyles.active, !changeSearchIcon)} 
                onMouseOut={() => handle_mouseover_mouseout(1, colorStyles.inActive, !changeSearchIcon)}
            >
                { changeSearchIcon ? searchFilled("Search_Svg", {fill: searchTextStyle(changeSearchIcon).color as CSSProperties} ) : search("Search_Svg") }
                <p style={searchTextStyle(changeSearchIcon)}>Search</p>
            </article>
            
            {/* <article>
                <IonIcon className='User_Ic' name='person-outline'/>
                <p>Login</p>
            </article> */}
        </section>
    )
}



function BottomSidebar() {
    const boxRef = useRef<HTMLDivElement>(null);

    return (
        <section className="Bottom_Sidebar">
            <header className='Bottom_Sidebar_Header'>
                <div className='LibraryTitle_CreateBtn_Container'>
                    <span>
                        {library("Library_Svg")}
                        <p>Your Library</p>
                    </span>
                    <span>
                        <IonIcon 
                            className='Add_Outline_Ic' 
                            name='add-outline' 
                            onClick={() => handle_create_box(boxRef)}
                        />
                        
                        <div 
                            ref={boxRef} 
                            className='Create_Playlist_Folder_Box' 
                            style={createPlaylistFolderBox}
                        >
                            <button>
                                <IonIcon className='Musical_Notes_Outline_Ic' name="musical-notes-outline" />
                                <p>Create a new playlist</p>
                            </button>
                            <button>
                                <IonIcon className='Folder_Outline' name="folder-outline" />
                                <p>Create a playlist folder</p>
                            </button>
                        </div>
                    </span> 
                </div>

                <ul className='Selection_List'>
                    <li>Playlists</li>
                    <li>Artists</li>
                    <li>Albums</li>
                </ul>
            </header>

            <UserLibrary />
        </section>
    ) 
}





function UserLibrary() {
    const[shrinkGrowInput, setShrinkGrowInput] = useState<boolean>(false);
    // const taylorSwift = "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg";
    // const likedSong = "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg";


    return (
        <section className='User_Library'>
            <article className='Search_User_Saved_Item'>
                <div className='Search_Ic_Box'>
                    <IonIcon 
                        className='Search_Ic' 
                        name='search-outline' 
                        onClick={() => setShrinkGrowInput((prev) => prev ? false : true)}
                    />
                    
                    <input 
                        type="text" 
                        className='Search_Input' 
                        placeholder='Search in your library'
                        style={SearchInputStyle(shrinkGrowInput)}
                    />
                </div>

                <div className='Recent_Box'>
                    <label htmlFor="Recent">Recent</label>
                    <IonIcon name="caret-down-outline"/>
                </div>
            </article>

            <article className='User_Saved_Item_Container'>
                <ul className='User_Categories'>
                    <li className='Categories'>
                        {playlists("Category Playlists")}
                        <p>Playlists</p>
                    </li>
                    <li className='Categories'>
                        {songs("Category Songs")}
                        <p>Songs</p>
                    </li>
                    <li className='Categories'>
                        {madeForYou("Category Made_For_You")}
                        <p>Made for You</p>
                    </li>
                    <li className='Categories'>
                        {artists("Category Artists")}
                        <p>Artists</p>
                    </li>
                    <li className='Categories'>
                        {albums("Category Albums")}
                        <p>Albums</p>
                    </li>
                </ul>
            </article>
        </section>
    )
}


export { Sidebar };









/* 


                <ul className='User_Saved_Item'>
                    <li className='User_Saved_List Artist'>
                        <img src={taylorSwift} alt="" />
                        <div className='Title_Name_Container'>
                            <p>Title</p>
                            <p>Artist</p>
                        </div>
                    </li>
                    <li className='User_Saved_List Playlist'>
                        <img src={likedSong} alt="" />
                        <div className='Title_Name_Container'>
                            <p>Title</p>
                            <p>Playlist</p>
                        </div>
                    </li>
                </ul>

*/