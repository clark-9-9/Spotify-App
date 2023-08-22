export const logInBtn = document.getElementById('login') as HTMLAnchorElement;
export const playlistBtn = document.getElementById('playlist') as HTMLAnchorElement;
export const refreshBtn = document.getElementById('refresh') as HTMLAnchorElement;
export const tokenBtn = document.getElementById('token') as HTMLAnchorElement;

import type { TokenType } from "./Types";

logInBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/login';
}); 
 

tokenBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/get-token');
        const data: TokenType = await response.json();
        if("access_token" in data) localStorage.setItem("access_token", data.access_token as string);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
});

  
playlistBtn.addEventListener('click', async () => {  
    try {
        const response = await fetch('http://localhost:8080/get-playlists');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error); 
    }
});

refreshBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/refresh_token');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
});



// console.log(window.location.search); after ?name=none&age=32
