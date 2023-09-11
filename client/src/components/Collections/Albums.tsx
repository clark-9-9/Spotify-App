import { useEffect, useState, useContext } from "react";
import { RootAlbums } from "../../types/Albums";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainProvider";
import { ExpiredToken_BadRequest_BadOAuth } from "../../types/FetchData";



function Albums() {
    const navigate = useNavigate();
    const[albums, setAlbums] = useState<Array<RootAlbums>>([]);
    const storedToken = localStorage.getItem("access_token");
        const sharedContextValues = useContext(MainContext);
    const { 
        singleDataAndState: { setSingleData }  
    } = sharedContextValues;


    const handle_get_albums = async () => {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ access_token: storedToken })
        }

        const response = await fetch("/get-albums", options);
        const { data }: { data: RootAlbums | ExpiredToken_BadRequest_BadOAuth } = await response.json();
        
        if(!data || "error" in data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
        } else {
            setAlbums([ data ]);
        }
    }


    useEffect(() => {
        setSingleData([]);
        handle_get_albums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="Albums_Container">
            <h3>Albums</h3>

            <ul className="List_Of_Albums">
                { (!albums || !albums[0]) && <span className="loader"></span> }
                
                {
                    (albums && albums[0]) && albums[0].items.map((item, index) => {
                        return (
                            <Link 
                                to={`/main/collection/single/${item.album.id}?type=album`}
                                key={item.album.id}
                                className='Albums_List'
                            >
                                <img src={item.album.images[0].url} alt="" />

                                <div>
                                    <p>{item.album.name}</p>
                                    <p>Album . {item.album.artists[0].name}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Albums