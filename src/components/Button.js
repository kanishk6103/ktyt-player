import React from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from 'react';
import { YOUTUBE_API_KEY } from '../constants';
import { useDispatch } from "react-redux";
import { getSearchResults } from "../utils/appSlice";

const Button = ({ name }) => {
    // const [searchedResults, setSearchedResults] = useState([]);
    const isDarkMode = useSelector(store => store.app.isDarkMode);
    // const [inputText, setInputText] = useState("");
    // const dispatch = useDispatch();
    let style = "bg-gray-300";
    if (isDarkMode) { style = "bg-gray-600" }
    // const [flag, setFlag] = useState(false);
    // useEffect(() => {
    //     try { youtubeSearch(inputText) }
    //     catch (error) { console.log(error) }
    // }, [flag])
    // const handleSearch = async (text) => {
    //     await youtubeSearch(text);
    //     setFlag(!flag);
    // }
    // const youtubeSearch = async (query) => {
    //     try {
    //         const data = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + query + "&key=" + YOUTUBE_API_KEY);
    //         const json = await data.json();
    //         dispatch(getSearchResults(json?.items));
    //         setSearchedResults(json?.items)
    //     }
    //     catch (error) { console.log(error) }
    // }
    // console.log(name)
    return (
        <div>
            <button className={'px-3 m-2 rounded-lg w-max ' + style}>{name}</button>
            {/* <button className={'px-3 m-2 rounded-lg w-max ' + style} onClick={() => { setTimeout(() => { handleSearch({ name }); }, 100); }}>{name}</button> */}
        </div>
    )
}

export default Button