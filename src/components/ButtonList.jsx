import React from 'react'
import Button from './Button'
import { buttonList } from '../constants'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getSearchResults } from "../utils/appSlice";
import { YOUTUBE_API_KEY } from "../constants";
import axios from 'axios';



const ButtonList = () => {
    const [searchedResults, setSearchedResults] = useState([]);
    const [buttonName, setName] = useState("");
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        try { if (buttonName) { youtubeSearch(buttonName) } }
        catch (error) { console.log(error) }
    }, [flag])

    const handleButtonSearch = async () => {
        await youtubeSearch(buttonName);
        setFlag(!flag);
    }

    const youtubeSearch = async (query) => {
        try {
            // const data = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + query + "&key=" + YOUTUBE_API_KEY);
            // const json = await data.json();
            // dispatch(getSearchResults(json?.items));
            // setSearchedResults(json?.items)
            const response = await axios.get(`http://localhost:4000/api/youtube-search/${query}`); // Make an HTTP GET request to the backend
            // console.log(response);   // These are the search results
            const data = await response.data;
            dispatch(getSearchResults(data));
            setSearchedResults(data);
            // console.log(json?.items);
        }
        catch (error) { console.log(error) }
    }

    return (
        <div className='ml-32 rounded-3xl flex space-x-2 my-4 overflow-x-scroll no-scrollbar overflow-y-hidden w-[85vw] px-3 mx-4'>
            {buttonList.map((singleItem) => {
                return <div key={singleItem.id} onClick={() => { setName(singleItem.name); setTimeout(() => { handleButtonSearch() }, 100) }}><Button name={singleItem.name} /></div>
            })}
        </div>
    )
}

export default ButtonList;
