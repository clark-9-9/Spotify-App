import { CSSProperties } from "react";

const colorStyles = {
    active: "rgba(255, 255, 255)",
    inActive: "rgba(255, 255, 255, 0.7)",
}


const homeTextStyle = (changeHomeIcon: boolean): CSSProperties => { 
    return {
        color: changeHomeIcon ? colorStyles.active : colorStyles.inActive 
    };
}

const searchTextStyle = (changeSearchIcon: boolean): CSSProperties => { 
    return {
        color: changeSearchIcon ? colorStyles.active : colorStyles.inActive
    };
}

const searchInputStyle = (shrinkGrowInput: boolean): CSSProperties => {
    return {
        width: shrinkGrowInput ? "200px" : "0",
        paddingLeft: shrinkGrowInput ? "35px" : "0",
        paddingRight: shrinkGrowInput ? "10px" : "0",
        visibility: shrinkGrowInput ? "visible" : "hidden",
        opacity: shrinkGrowInput ? "1" : "0",
    };
}


const createPlaylistFolderBox: CSSProperties = {
    visibility:"hidden",
    opacity: "0"
}


export { 
    colorStyles,
    searchInputStyle, 
    createPlaylistFolderBox,
    homeTextStyle,
    searchTextStyle 
};
