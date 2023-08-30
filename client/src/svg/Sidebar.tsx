import { CSSProperties } from "react";


interface Styles {
    [key: string]: CSSProperties;
}

const home = (className: string, style?: Styles) => (
    <svg role="img" height="24" width="24" aria-hidden="true" style={style} className={className} viewBox="0 0 24 24" data-encore-id="icon">
        <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
    </svg>
);


const homeFilled = (className: string, style?: Styles) => (
    <svg role="img" height="24" width="24" aria-hidden="true" style={style} className={className} viewBox="0 0 24 24" data-encore-id="icon">
        <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
    </svg>
);


const search = (className: string, style?: Styles) => (
    <svg role="img" height="24" width="24" aria-hidden="true" style={style} className={className} viewBox="0 0 24 24" data-encore-id="icon">
        <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
    </svg>
);


const searchFilled = (className: string, style?: Styles) => (
    <svg role="img" height="24" width="24" aria-hidden="true" style={style} className={className} viewBox="0 0 24 24" data-encore-id="icon">
        <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path><path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
    </svg>
)


const library = (className: string, style?: Styles) => (
    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" style={style} className={className}>
        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
    </svg>
);

/* 
-------------------------------------------------------------------------
*/


const playlists = (className: string, style?: Styles) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 10V4" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.3333 12C12.7753 12 13.1992 11.8244 13.5118 11.5119C13.8244 11.1993 14 10.7754 14 10.3334C14 9.89133 13.8244 9.4674 13.5118 9.15484C13.1992 8.84228 12.7753 8.66669 12.3333 8.66669C11.8913 8.66669 11.4673 8.84228 11.1548 9.15484C10.8422 9.4674 10.6666 9.89133 10.6666 10.3334C10.6666 10.7754 10.8422 11.1993 11.1548 11.5119C11.4673 11.8244 11.8913 12 12.3333 12Z" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 8H2" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.6667 4H2" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H2" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const songs = (className: string, style?: Styles) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.33329 14.6667C6.80605 14.6667 7.99996 13.4728 7.99996 12C7.99996 10.5273 6.80605 9.33337 5.33329 9.33337C3.86053 9.33337 2.66663 10.5273 2.66663 12C2.66663 13.4728 3.86053 14.6667 5.33329 14.6667Z" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12V1.33337L12.6667 4.00004" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const madeForYou = (className: string, style?: Styles) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6667 14V12.6667C12.6667 11.9594 12.3858 11.2811 11.8857 10.781C11.3856 10.281 10.7073 10 10 10H6.00004C5.2928 10 4.61452 10.281 4.11442 10.781C3.61433 11.2811 3.33337 11.9594 3.33337 12.6667V14" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.00004 7.33333C9.4728 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.4728 2 8.00004 2C6.52728 2 5.33337 3.19391 5.33337 4.66667C5.33337 6.13943 6.52728 7.33333 8.00004 7.33333Z" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const artists = (className: string, style?: Styles) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clipPath="url(#clip0_2_372)">
            <path d="M8.00004 5.33337L1.97337 11.3734C1.78048 11.5431 1.62444 11.7507 1.51488 11.9831C1.40533 12.2155 1.34458 12.468 1.3364 12.7248C1.32822 12.9816 1.37278 13.2374 1.46732 13.4763C1.56187 13.7153 1.70439 13.9323 1.88609 14.114C2.06779 14.2957 2.28481 14.4382 2.52374 14.5328C2.76268 14.6273 3.01846 14.6719 3.27529 14.6637C3.53213 14.6555 3.78455 14.5948 4.01699 14.4852C4.24943 14.3756 4.45694 14.2196 4.62671 14.0267L10.6667 8.00004" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.3333 8.00004C13.1743 8.00004 14.6667 6.50766 14.6667 4.66671C14.6667 2.82576 13.1743 1.33337 11.3333 1.33337C9.49238 1.33337 8 2.82576 8 4.66671C8 6.50766 9.49238 8.00004 11.3333 8.00004Z" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_2_372">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const albums = (className: string, style?: Styles) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7667 4L13.4334 13.3333" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.06665 4V13.3333" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.3667 5.33337V13.3334" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.66663 2.66663V13.3333" stroke="#FAFAFA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);



export { 
    home, homeFilled,
    search, searchFilled, library,
    playlists, songs, madeForYou,
    artists, albums
};