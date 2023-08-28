import { CSSProperties } from "react";

const SearchInputStyle = (shrinkGrowInput: boolean): CSSProperties => {
    return {
        width: shrinkGrowInput ? "200px" : "0",
        paddingLeft: shrinkGrowInput ? "35px" : "0",
        paddingRight: shrinkGrowInput ? "10px" : "0",
        visibility: shrinkGrowInput ? "visible" : "hidden",
        opacity: shrinkGrowInput ? "1" : "0",
    };
};



export { SearchInputStyle };
