const logInBtn = document.getElementById('login');
const playlistBtn = document.getElementById('playlist');
const refreshBtn = document.getElementById('refresh');

logInBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/login';
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

