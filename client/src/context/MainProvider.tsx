import React from 'react'
import { createContext } from 'react';


interface MainContextTypes {
    accessToken: string;
}

const mainContextValues: MainContextTypes = {
    accessToken: "",
}


export const MainContext = createContext<MainContextTypes>(mainContextValues);


interface MainProviderPropsTypes {
    children: React.ReactNode;
}


function MainProvider({ children }: MainProviderPropsTypes) {
    
    // return (
    //     <MainContext.Provider>
    //         {children}
    //     </MainContext.Provider>
    // )
}

export default MainProvider;