// import IonIcon from '@reacticons/ionicons';
import {
    home, 
    homeFilled,
    search,
    searchFilled
} from "../svg/Main";
import { useState } from 'react';



function Sidebar() {
    const[changeHomeIcon, setChangeHomeIcon] = useState<boolean>(true);
    const[changeSearchIcon, setChangeSearchIcon] = useState<boolean>(false);

    const Styles = {
        active: "rgba(255, 255, 255)",
        inActive: "rgba(255, 255, 255, 0.7)",
    }

    const homeStyle = { color: changeHomeIcon ? Styles.active : Styles.inActive };
    const searchStyle = { color: changeSearchIcon ? Styles.active : Styles.inActive };


    const handle_change_home_icon = (): void => {
        setChangeHomeIcon(true);
        setChangeSearchIcon(false);
    }

    const handle_change_search_icon = (): void => {
        setChangeHomeIcon(false);
        setChangeSearchIcon(true);
    }

    return (
        <aside className="Sidebar">
            <div className="Top_Sidebar">
                <span onClick={handle_change_home_icon}>
                    {
                        changeHomeIcon ? homeFilled("Home_Ic", { fill: homeStyle.color }) : home("Home_Ic")
                    }
                    <p style={homeStyle}>Home</p>
                </span>

                <span onClick={handle_change_search_icon}>
                    {   
                        changeSearchIcon ? searchFilled("Search_Ic", {fill: searchStyle.color} ) : search("Search_Ic")
                    }
                    <p style={searchStyle}>Search</p>
                </span>
            </div>

            <div className="Bottom_Sidebar">

            </div>
        </aside>
    )
}



export { Sidebar };