import { RouterProvider } from 'react-router-dom';
import router from './routes/Route';




function App() {
  return ( 
    <div className="Main">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
