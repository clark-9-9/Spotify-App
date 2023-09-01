import { Sidebar } from './components/main/Sidebar';
import { Dashboard } from './components/main/Dashboard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
    const navigate = useNavigate();

  
    // const checkTokenExpiration = () => {
    //   if (expiresIn && expiresIn > 0) {
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     if (currentTime + 60 >= expiresIn) {
    //       // Token is about to expire within 60 seconds
    //       refreshTokenRequest();
    //     }
    //   }
    // };
  
    // const refreshTokenRequest = () => {
    //   if (!refreshToken) {
    //     // Handle the case where no refresh token is available
    //     return;
    //   }
    // }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) {
            navigate("/");
        }
    }, [navigate])
 
    return ( 
        <div className="Main">
            <Sidebar />
            <Dashboard />
        </div>
    );
}

export default App; 
