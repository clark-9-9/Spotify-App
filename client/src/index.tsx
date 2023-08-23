import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/Main.css";
import "./styles/Home.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(        
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

         

//   <React.StrictMode>
//   </React.StrictMode>

