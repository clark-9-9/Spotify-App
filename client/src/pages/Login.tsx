import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ResponseAccessToken, ResponseErrorToken } from "../types/Login";



function Login() {
    const code = new URLSearchParams(window.location.search).get("code");
    const navigate = useNavigate();
    const getCodeFromURL = "http://localhost:8080/login";
    const token = localStorage.getItem("access_token");

    const handle_login = () => {
        window.location.href = getCodeFromURL;
    }
     
    useEffect(() => {
        const fetchAccessToken = async (): Promise<void> => {
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
                
                if ("access_token" in data) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    localStorage.setItem("expires_in", data.expires_in.toString());
                    navigate("/main");
                } else {
                    window.location.href = getCodeFromURL;
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        if(code) fetchAccessToken();
        if(token) navigate("/main");

    }, [code, navigate, token]);

    return (        
        <div className="Container" style={{ display: !token ? "flex" : "none" }}>
            <button className="Btn" onClick={handle_login}>Login</button>
            <button className="Btn">Demo</button>
        </div>
    )
}

export default Login; 

