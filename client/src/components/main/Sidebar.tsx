// import IonIcon from '@reacticons/ionicons';
import { Link, NavLink } from 'react-router-dom';
import { userCollections } from '../../data/Sidebar';

import {
    home, 
    search, 
    library,
} from "../../svg/Sidebar";



function Sidebar() {

    return (
        <aside className="Sidebar">
            <TopSidebar />

            <BottomSidebar />
        </aside>
    )
}


function TopSidebar() {


    return (
        <section className="Top_Sidebar">
            <NavLink to='/main' >
                { home("Home_Svg") }
                <p>Home</p>
            </NavLink>

            <article >
                { search("Search_Svg") }
                <p>Search</p>
            </article>
        </section>
    )
}


function BottomSidebar() {

    return (
        <section className="Bottom_Sidebar">
            <header className='Bottom_Sidebar_Header'>
                <div className='LibraryTitle_CreateBtn_Container'>
                    <span>
                        {library("Library_Svg")}
                        <p>Your Library</p>
                    </span>
                </div>
            </header>

            <UserLibrary />
        </section>
    ) 
}


function UserLibrary() {

    
    return (
        <section className='User_Library'>

            <article className='User_Saved_Item_Container'>
                <ul className='User_Collections'>
                    {
                        userCollections.map((collection, index) => {
                            return (
                                <Link 
                                    key={index} 
                                    to={collection.to} 
                                    className='Collection'
                                >
                                    {collection.icon}
                                    <p>{collection.text}</p>
                                </Link>
                            )
                        })
                    }               
                </ul>
            </article>
        </section>
    )
}



export { 
    Sidebar,
    BottomSidebar
};

