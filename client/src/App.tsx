import { useEffect } from 'react';
import Main from './pages/Main';
import { useNavigate } from 'react-router-dom';


function App() {
    const storedToken = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        if(!storedToken) navigate("/");
    }, [storedToken, navigate]) 
    
    return (
        <Main /> 
    )   
}

export default App; 
