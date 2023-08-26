import IonIcon from '@reacticons/ionicons';
import React, { useState, CSSProperties, useRef } from 'react';

import {
    home, homeFilled,search, searchFilled, library
} from "../../svg/Sidebar";

import {
    handle_change_home_icon, handle_change_search_icon, 
    handle_mouseover_mouseout, 
} from "../../handler/Sidebar";



const colorStyles = {
    active: "rgba(255, 255, 255)",
    inActive: "rgba(255, 255, 255, 0.7)",
}


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



interface TopSidebarTypes {
    changeHomeIconAndState: {
        changeHomeIcon: boolean; 
        setChangeHomeIcon: React.Dispatch<React.SetStateAction<boolean>>;
    };

    changeSearchIconAndState: {
        changeSearchIcon: boolean; 
        setChangeSearchIcon: React.Dispatch<React.SetStateAction<boolean>>;
    }
}
 

function TopSidebar({ changeHomeIconAndState, changeSearchIconAndState }: TopSidebarTypes) {
    const{ changeHomeIcon, setChangeHomeIcon } = changeHomeIconAndState;
    const{ changeSearchIcon, setChangeSearchIcon } = changeSearchIconAndState;

    const homeTextStyle = { color: changeHomeIcon ? colorStyles.active : colorStyles.inActive };
    const searchTextStyle = { color: changeSearchIcon ? colorStyles.active : colorStyles.inActive };

    return (
        <section className="Top_Sidebar">
            <article 
                onClick={() => handle_change_home_icon(setChangeHomeIcon, setChangeSearchIcon)} 
                onMouseOver={() => handle_mouseover_mouseout(0, colorStyles.active, !changeHomeIcon)} 
                onMouseOut={() => handle_mouseover_mouseout(0, colorStyles.inActive, !changeHomeIcon)}
            >
                { changeHomeIcon ? homeFilled("Home_Svg", { fill: homeTextStyle.color as CSSProperties }) : home("Home_Svg") }
                <p style={homeTextStyle}>Home</p>
            </article>

            <article 
                onClick={() => handle_change_search_icon(setChangeHomeIcon, setChangeSearchIcon)}
                onMouseOver={() => handle_mouseover_mouseout(1, colorStyles.active, !changeSearchIcon)} 
                onMouseOut={() => handle_mouseover_mouseout(1, colorStyles.inActive, !changeSearchIcon)}
            >
                { changeSearchIcon ? searchFilled("Search_Svg", {fill: searchTextStyle.color as CSSProperties} ) : search("Search_Svg") }
                <p style={searchTextStyle}>Search</p>
            </article>

            <article>
                <IonIcon className='User_Ic' name='person-outline'/>
                <p>Login</p>
            </article>
        </section>
    )
}



function BottomSidebar() {
    const boxRef = useRef<HTMLDivElement>(null);

    const handle_create_box = () => {
        const box = boxRef.current;
                                
        if(!box) return;
        else if(box.style.visibility === 'hidden') {
            box.style.visibility = "visible";
            box.style.opacity = "1";
        } else {
            box.style.visibility = "hidden";
            box.style.opacity = "0";
        }
    }

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
                            onClick={handle_create_box}
                        />
                        
                        <div className='Create_Playlist_Folder_Box' ref={boxRef}>
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

    return (
        <section className='User_Library'>
            <article className='Search_User_Saved_Item'>
                <div className='Search_Ic_Box'>
                    <IonIcon className='Search_Ic' name='search-outline'/>
                    <input type="search" className='Search_Item_Input'/>
                </div>
                <p>Recent</p>
            </article>

            <article className='User_Saved_Item'>
                
            </article>
        </section>
    )
}


export { Sidebar };




/* 

                            <label className='Create_Playlist_div'>
                                <div>
                                    <IonIcon className='Musical_Notes_Outline_Ic' name="musical-notes-outline" />
                                    <p>Create a new playlist</p>
                                </div>

                                <div>
                                    <IonIcon className='Folder_Outline' name="folder-outline" />
                                    <p>Create a playlist folder</p>
                                </div>
                            </label>
                            <IonIcon className='Add_Outline_Ic' name='add-outline' />

*/