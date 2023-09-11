import { Fragment, useEffect } from 'react';
import Main from './pages/Main';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/main/Navbar';


function App() {
    const storedToken = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        if(!storedToken) navigate("/");
    }, [storedToken, navigate]) 
    
    return (
        <Fragment>
            <Navbar />
            <Main /> 
        </Fragment>
    )   
}

export default App; 
