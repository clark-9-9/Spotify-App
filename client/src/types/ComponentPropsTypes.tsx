import { Item } from "./Tracks";


export interface TopSidebarTypes {
    changeHomeIconAndState: {
        changeHomeIcon: boolean; 
        setChangeHomeIcon: React.Dispatch<React.SetStateAction<boolean>>;
    };

    changeSearchIconAndState: {
        changeSearchIcon: boolean; 
        setChangeSearchIcon: React.Dispatch<React.SetStateAction<boolean>>;
    }
}
 

export interface SongsPropsTypes {
    item: Item, 
    index: number
}
