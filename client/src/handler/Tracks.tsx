import { NavigateFunction } from "react-router-dom";
import type { RootTracks } from "../types/Tracks";
import type { ExpiredToken_BadRequest_BadOAuth } from "../types/FetchData";

interface FetchTracksParamTypes {
    storedToken: string | null,
    navigate: NavigateFunction,
    setTracks: React.Dispatch<React.SetStateAction<RootTracks[]>>,
}


const handle_fetch_tracks = async (
    {
        storedToken, 
        navigate, 
        setTracks, 
    }: FetchTracksParamTypes

) => {
    const response = await fetch("/get-tracks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token: storedToken })
    });

    const { data }: { data: RootTracks | ExpiredToken_BadRequest_BadOAuth }  = await response.json();
    
    if(!data || "error" in data) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
        return;
    } else {
        setTracks([ data ]); 
    }
}


const handle_format_date = (inputDate: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    };
    return new Date(inputDate).toLocaleDateString("US", options);
}


interface FormatDuration {
    hours: number;
    minutes: number;
    seconds: number;
}   

const handle_format_duration = (duration: number): FormatDuration => {
    const seconds = Math.floor(duration / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return { hours, minutes, seconds: remainingSeconds };
}


const handle_display_duration = (time: number | null): string | null => {
    let str = "";
    if(!time) return null;

    let duration: FormatDuration = handle_format_duration(time);
    if(duration.hours !== 0) str += duration.hours + ":";
    if(duration.minutes !== 0) str += duration.minutes + ":";
    if(duration.seconds < 10) str += 0;
    if(duration.seconds !== 0) str += duration.seconds;
    else str += "0";
    
    return str
}




export {
    handle_fetch_tracks,
    handle_format_date,
    handle_format_duration,
    handle_display_duration,
};