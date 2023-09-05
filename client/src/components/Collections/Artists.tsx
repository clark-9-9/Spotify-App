import { useEffect, useState } from "react";
import { Item, RootArtists } from "../../types/Artists";
import { useNavigate } from "react-router-dom";
import { handle_fetch_artists } from "../../handler/Artists";


function Artists() {

    const[artists, setArtists] = useState<Array<RootArtists>>([]);
    const storedToken = localStorage.getItem("access_token");
    const navigate = useNavigate();


    useEffect(() => {
        handle_fetch_artists({ storedToken, navigate, setArtists });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  


    return (
        <section className="Artists_Container">
            <h3>Artists & Following</h3>

            <ul className="List_Of_Artists">
                {
                    (!artists || !artists[0]) && <span className="loader"></span>
                }

                {
                    (artists && artists[0]) && artists[0].artists.items.map((item: Item, index) => {
                        return (
                            <li className="Artist_List" key={item.id}>
                                <img src={item.images[0].url} alt="" />
                                <div>
                                    <p>{item.name}</p>    
                                    <p>Profile</p>    
                                </div>
                            </li>
                        )
                    })
                }                
            </ul>
        </section>
    )
}

export default Artists