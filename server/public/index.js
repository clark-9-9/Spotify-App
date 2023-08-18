const logInBtn = document.getElementById('login');

// Add a click event listener to the login button
logInBtn.addEventListener('click', () => {
    // Redirect the user to the Spotify authorization URL
    window.location.href = 'http://localhost:8080/login';
});

const code = new URLSearchParams(window.location.search).get("code");
console.log(code);


// document.addEventListener('DOMContentLoaded', () => {
//     const code = new URLSearchParams(window.location.search).get("code");
//     console.log(code);
// });

// console.log(window.location.search);