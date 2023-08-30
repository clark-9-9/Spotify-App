import { Sidebar } from './components/main/Sidebar';
import { Dashboard } from './components/main/Dashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) navigate("/");
    }, [navigate])
 
    return ( 
        <div className="Main">
            <Sidebar />
            <Dashboard />
        </div>
    );
}

export default App; 
