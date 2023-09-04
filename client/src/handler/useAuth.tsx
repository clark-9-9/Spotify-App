import { useEffect, useState } from 'react'
import { ResponseAccessToken, ResponseErrorToken } from '../types/Login';




function useAuth(code: string | null) {
    const [accessToken, setAccessToken] = useState<string>("");
    // const [refreshToken, setRefreshToken] = useState<string>();
    // const [expiresIn, setExpiresIn] = useState<number>();
  

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
                    localStorage.setItem("expires_in", data.expires_in.toString());
                    setAccessToken(data.access_token);
                    // setRefreshToken(data.refresh_token);
                    // setExpiresIn(data.expires_in);
                } 

                console.log(data, "<---- access token");
                
            } catch (error) {
                console.error(error);
            }
        };
    
        handle_fetch_access_token();
    }, [code]);

    return accessToken;
}

export default useAuth







/*
useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const handle_refresh_token = () => {
        const options: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh_token: refreshToken })
        } 

        fetch("/refresh-token", options)
            .then((response) => response.json())
            .then((data: RefreshTokenResponseType) => {
                setAccessToken(data.access_token);
                setExpiresIn(data.expires_in);
                console.log(data, "<---- refresh token");
                
            })
            .catch(() => {
                window.location.href = "/";
            })
    }

    // const interval = setInterval(() => {
        // handle_refresh_token();            
    // }, (expiresIn - 60) * 1000)    

    // return () => clearInterval(interval);

}, [refreshToken, expiresIn])

*/