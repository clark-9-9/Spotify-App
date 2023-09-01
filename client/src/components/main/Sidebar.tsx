// import IonIcon from '@reacticons/ionicons';
import React, { useState, CSSProperties } from 'react';
import type { TopSidebarTypes } from '../../types/Sidebar';
import { NavLink } from 'react-router-dom';
import { userCollections } from '../../data/Sidebar';

import {
    home, 
    homeFilled,search, 
    searchFilled, 
    library,
} from "../../svg/Sidebar";

import {
    handle_change_home_icon, 
    handle_change_search_icon, 
    handle_mouseover_mouseout, 
} from "../../handler/Sidebar";

import { 
    colorStyles, 
    homeTextStyle, 
    searchTextStyle,
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
            
            {/* Top Sidebar 1 */}
        </section>
    )
}


function BottomSidebar() {
    // const boxRef = useRef<HTMLDivElement>(null);

    return (
        <section className="Bottom_Sidebar">
            <header className='Bottom_Sidebar_Header'>
                <div className='LibraryTitle_CreateBtn_Container'>
                    <span>
                        {library("Library_Svg")}
                        <p>Your Library</p>
                    </span>

                    {/* Bottom Sidebar 1 */}                    
                </div>
                
                {/* Bottom Sidebar 2 */}
            </header>

            <UserLibrary />
        </section>
    ) 
}


function UserLibrary() {
    // const[shrinkGrowInput, setShrinkGrowInput] = useState<boolean>(false);
    // const taylorSwift = "https://media1.popsugar-assets.com/files/thumbor/hnVKqXE-xPM5bi3w8RQLqFCDw_E/475x60:1974x1559/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg";


    return (
        <section className='User_Library'>
            {/* User Library 1 */}

            <article className='User_Saved_Item_Container'>
                <ul className='User_Collections'>
                    {
                        userCollections.map((collection, index) => {
                            return (
                                <NavLink key={index} to={collection.to} className='Collection'>
                                    {collection.icon}
                                    <p>{collection.text}</p>
                                </NavLink>
                            )
                        })
                    }               
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
        <div className='Artist Title_Name_Container'>
            <p>Title</p>
            <p>Artist</p>
        </div>
    </li>
    <li className='User_Saved_List Playlist'>
        <img src={likedSong} alt="" />
        <div className='Playlist Title_Name_Container'>
            <p>Title</p>
            <p>Playlist</p>
        </div>
    </li>
</ul>
*/


/* 
Top Sidebar 1 
            <article>
                <IonIcon className='User_Ic' name='person-outline'/>
                <p>Login</p>
            </article>
*/


/* 
Bottom Sidebar 1
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


Bottom Sidebar 2
                <ul className='Selection_List'>
                    <li>Playlists</li>
                    <li>Artists</li>
                    <li>Albums</li>
                </ul>

*/


/*       
User Library 1
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
                        style={searchInputStyle(shrinkGrowInput)}
                    />
                </div>

                <div className='Recent_Box'>
                    <label htmlFor="Recent">Recent</label>
                    <IonIcon name="caret-down-outline"/>
                </div>
            </article> 
*/

