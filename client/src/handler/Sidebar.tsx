type BooleanStateType = React.Dispatch<React.SetStateAction<boolean>>;

const handle_change_home_icon = (setChangeHomeIcon: BooleanStateType, setChangeSearchIcon: BooleanStateType): void => {
    setChangeHomeIcon(true);
    setChangeSearchIcon(false);
}

const handle_change_search_icon = (setChangeHomeIcon: BooleanStateType, setChangeSearchIcon: BooleanStateType): void => {
    setChangeHomeIcon(false);
    setChangeSearchIcon(true); 
}


const handle_mouseover_mouseout = (text: number, color: string, condition: boolean): void => {
    const articles = document.querySelectorAll(".Top_Sidebar article") as NodeListOf<HTMLElement>;
    if(condition) {
        const paragraph = articles[text]?.querySelector("p");
        if(paragraph) {
            paragraph.style.color = color;
        }
    }
};



const handle_create_box = (boxRef: React.RefObject<HTMLDivElement>) => {
    const box = boxRef.current;
                            
    if(!box) return;
    else if(box.style.visibility === 'hidden') {
        box.style.visibility = "visible";
        box.style.opacity = "1";
    } else {
        box.style.visibility = "hidden";
        box.style.opacity = "0";
    }
}




export {
    handle_change_home_icon, 
    handle_change_search_icon, 
    handle_mouseover_mouseout, 
    handle_create_box
}