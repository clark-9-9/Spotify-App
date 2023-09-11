import React, {  useState } from 'react'
import { createContext } from 'react';
import { RootSinglePlaylist } from '../types/SinglePlaylist';
import { RootSingleArtist } from '../types/SingleArtist';
import { RootSingleAlbum } from '../types/SingleAlbum';


export interface MainContextTypes {
    singleDataAndState: {
        singleData: Array<RootSinglePlaylist | RootSingleArtist | RootSingleAlbum>;
        setSingleData: React.Dispatch<React.SetStateAction<(RootSinglePlaylist | RootSingleArtist | RootSingleAlbum)[]>>;
    }   
}


const mainContextValues: MainContextTypes = {
    singleDataAndState: {
        singleData: [],
        setSingleData: () => [],
    }   
}



export const MainContext = createContext<MainContextTypes>(mainContextValues);

interface MainProviderPropsTypes {
    children: React.ReactNode;
}


function MainProvider({ children }: MainProviderPropsTypes) {
    const[singleData, setSingleData] = useState<Array<RootSinglePlaylist | RootSingleArtist | RootSingleAlbum>>([]);


    return (
        <MainContext.Provider 
            value={{
                singleDataAndState: {singleData, setSingleData}            
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider;