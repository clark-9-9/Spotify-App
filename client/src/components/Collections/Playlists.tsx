import type { RootPlayLists, Item } from "../../types/Playlists";
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handle_fetch_playlists } from "../../handler/Playlists";
import { MainContext } from "../../context/MainProvider";


function Playlists() {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("access_token");
    const[ playlists, setPlaylists ] = useState<Array<RootPlayLists>>([]);
    const sharedContextValues = useContext(MainContext);
    const { 
        singleDataAndState: { setSingleData }  
    } = sharedContextValues;



    useEffect(() => {
        setSingleData([]);
        handle_fetch_playlists({ storedToken, navigate, setPlaylists });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className='Playlists_Container'>
            <h3>Playlists</h3>

            <ul className='List_Of_Playlists'>
                { (!playlists || !playlists[0]) && <span className="loader"></span> }
                
                {
                    (playlists && playlists[0]) && playlists[0].items.map((item: Item) => {
                        return (
                            <NavLink
                                to={`/main/collection/single/${item.id}?type=playlist`} 
                                key={item.id}
                                className='Playlist_List' 
                            >
                                <img src={item.images[0].url} alt="" />

                                <div>
                                    <p>{item.name}</p>
                                    <p>Playlist . {item.owner.display_name}</p>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Playlists; 