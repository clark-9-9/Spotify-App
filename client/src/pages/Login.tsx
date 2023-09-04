import { useEffect, useState } from "react";
import { ResponseAccessToken, ResponseErrorToken } from "../types/Login";
import { useNavigate } from "react-router-dom";


function Login() {
    const code = new URLSearchParams(window.location.search).get("code");
    const storedToken = localStorage.getItem("access_token");
    const getCodeFromURL = "http://localhost:8080/login";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [accessToken, setAccessToken] = useState<string>();
    const navigate = useNavigate();


    const handle_login = () => {
        window.location.href = getCodeFromURL;
    }


    useEffect(() => {
        const handle_fetch_access_token = async (): Promise<void> => {
            try {
                const callbackHeaders = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: code })
                }
                
                const response = await fetch('/callback', callbackHeaders);
                const{ data }: {data: ResponseAccessToken | ResponseErrorToken} = await response.json();
                    
                if (data && "access_token" in data) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    setAccessToken(data.access_token);
                } else {
                    window.location.href = "/";
                }

            } catch (error) {
                console.error(error);
            }
        };
    
        if(code) handle_fetch_access_token();       
    }, [code]);


    useEffect(() => {
        if(storedToken) navigate("/main");
    }, [storedToken, navigate])


    return (        
        <div className="Container" >
            <button className="Btn" onClick={handle_login}>Login</button>
            {/* <button className="Btn">Demo</button> */}
        </div>
    )
}

export default Login; 

