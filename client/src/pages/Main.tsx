import { Sidebar } from '../components/main/Sidebar'
import { Dashboard } from '../components/main/Dashboard'



function Main() {
    return (
        <div className="Main">
            <Sidebar />
            <Dashboard />
        </div>
    )    
}

export default Main