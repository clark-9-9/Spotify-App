"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenBtn = exports.refreshBtn = exports.playlistBtn = exports.logInBtn = void 0;
exports.logInBtn = document.getElementById('login');
exports.playlistBtn = document.getElementById('playlist');
exports.refreshBtn = document.getElementById('refresh');
exports.tokenBtn = document.getElementById('token');
exports.logInBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/login';
});
exports.tokenBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/get-token');
        const data = await response.json();
        if ("access_token" in data)
            localStorage.setItem("access_token", data.access_token);
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
});
exports.playlistBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/get-playlists');
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
});
exports.refreshBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/refresh_token');
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
});
// console.log(window.location.search); after ?name=none&age=32
