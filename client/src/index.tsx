import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/Main.css";
import "./styles/Sidebar.css";
import "./styles/Dashboard.css";
import { RouterProvider } from 'react-router-dom';
import router from './routes/Route';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(        
    <RouterProvider router={router} />
    // <React.StrictMode>
    // </React.StrictMode>
);

         

//   <React.StrictMode>
//   </React.StrictMode>

