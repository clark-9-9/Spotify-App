import { Sidebar } from '../components/main/Sidebar'
import { Dashboard } from '../components/main/Dashboard'
import MainProvider from '../context/MainProvider'



function Main() {

    return (
        <MainProvider>            
            <div className="Main">
                <Sidebar />
                <Dashboard />
            </div>
        </MainProvider>
    )    
}

export default Main