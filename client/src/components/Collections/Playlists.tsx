import type { RootPlayLists, Item } from "../../types/Playlists";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handle_fetch_playlists } from "../../handler/Playlists";


function Playlists() {
    const storedToken = localStorage.getItem("access_token");
    const[ playlists, setPlaylists ] = useState<Array<RootPlayLists>>([]);
    const navigate = useNavigate();



    useEffect(() => {
        handle_fetch_playlists({ storedToken, navigate, setPlaylists });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className='Playlists_Container'>
            <ul className='List_Of_Playlists'>
                {
                    (!playlists || !playlists[0]) && <span className="loader"></span>
                }
                {
                    (playlists && playlists[0]) && playlists[0].items.map((item: Item) => {
                        return (
                            <li className='Playlist_List' key={item.id}>
                                <img src={item.images[0].url} alt="" />

                                <div>
                                    <p>{item.name}</p>
                                    <p>Playlist . {item.owner.display_name}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Playlists; 