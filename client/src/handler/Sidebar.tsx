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
    const texts = document.querySelectorAll(".Top_Sidebar article p") as NodeListOf<HTMLParagraphElement>;
    if(condition) {
        texts[text].style.color = color;
    }
};




export {
    handle_change_home_icon, 
    handle_change_search_icon, 
    handle_mouseover_mouseout, 
}