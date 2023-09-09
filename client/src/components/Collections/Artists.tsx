import { useContext, useEffect, useState } from "react";
import { Item, RootArtists } from "../../types/Artists";
import { NavLink, useNavigate } from "react-router-dom";
import { handle_fetch_artists } from "../../handler/Artists";
import { MainContext } from "../../context/MainProvider";


function Artists() {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("access_token");
    const[artists, setArtists] = useState<Array<RootArtists>>([]);
    const sharedContextValues = useContext(MainContext);
    const { 
        singleDataAndState: { setSingleData }  
    } = sharedContextValues;


    


    useEffect(() => {
        setSingleData([]);
        handle_fetch_artists({ storedToken, navigate, setArtists });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  


    return (
        <section className="Artists_Container">
            <h3>Artists & Following</h3>

            <ul className="List_Of_Artists">
                { (!artists || !artists[0]) && <span className="loader"></span> }

                {
                    (artists && artists[0]) && artists[0].artists.items.map((item: Item, index) => {
                        return (
                            <NavLink 
                                to={`/main/collection/single/${item.id}?type=artist`}
                                className="Artist_List" 
                                key={item.id}
                            >
                                <img src={item.images[0].url} alt="" />
                                <div>
                                    <p>{item.name}</p>    
                                    <p>Profile</p>    
                                </div>
                            </NavLink>
                        )
                    })
                }                
            </ul>
        </section>
    )
}

export default Artists