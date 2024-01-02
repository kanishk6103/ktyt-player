import React, { useEffect, useState } from "react";
import Logo from "../assets/Images/logo.png"
import { toggleDarkMode, toggleMenu, getSearchResults } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, json } from "react-router-dom";
import { SERPAPI_API_KEY, YOUTUBE_API_KEY } from "../constants";
import { cacheResults } from "../utils/searchSlice";
import axios from "axios";
// import ToggleSwitch from "./toggleSwitch";

const Header = () => {
    const [searchedResults, setSearchedResults] = useState([]);
    const [visibleSuggestions, setVisibleSuggestions] = useState(false);
    const [inputText, setInputText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    // const [imageResults, setImageResults] = useState();
    // const [results, setResults] = useState([])
    const dispatch = useDispatch();
    const searchCache = useSelector((store) => store.search)
    useEffect(() => {
        const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
        dispatch(toggleDarkMode(isDarkMode));
    }, [dispatch]);

    //For Search
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        try { if (inputText) { youtubeSearch(inputText) } }
        catch (error) { console.log(error) }
    }, [flag])

    useEffect(() => {
        // We will write a function to make an API call after every keypress, but we will decline the API call which is made
        // if the difference between successive keyrpesses is less than 200ms.
        try {
            if (inputText) {
                const timer = setTimeout(() => {
                    if (searchCache[inputText]) {
                        setSuggestions(searchCache[inputText]);
                    }
                    else {
                        getSuggestions(inputText)
                    }
                }, 200)
                return () => {
                    clearTimeout(timer);
                }
            }
        }
        catch (error) { console.log(error) }
    }, [inputText])

    // useEffect(() => {
    //     google_search();
    // }, [inputText])

    const getSuggestions = async (text) => {
        try {
            // const data = await fetch("http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&q=" + text);  //cors errors
            // const json = await data.json();
            // // console.log(json[1]);
            // setSuggestions(json[1]);

            // // To update cache
            // dispatch(cacheResults({
            //     [inputText]: json[1],
            // }))
            const response = await axios.get(`http://localhost:4000/api/suggestions/${text}`);
            const suggestions = await response.data;
            // console.log(json[1]);
            setSuggestions(suggestions);

            // To update cache
            dispatch(cacheResults({
                [inputText]: suggestions,
            }))
        }
        catch (error) {
            console.log(error);
        }
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
            // console.log(data);   // These are the search results
            // console.log(json?.items);   // These are the search results
            // setResults(json?.items);
        }
        catch (error) { console.log(error) }
        // Here, the results are fetched for the search keyword inside json.items, the items can be console logged, need to send them to the main container so that they can be rendered inside it.
        // All results and search results to be made to filter the videos.
        // The filtered results will be stored inside the new use state.
    }

    // const google_search = async () => {
    //     try {
    //         if (suggestions.length > 0) {
    //             const data = await fetch("https://serpapi.com/search.json?engine=google_images&q=" + suggestions[0][0] + "&google_domain=google.com&gl=in&hl=en&api_key=" + SERPAPI_API_KEY);
    //             const json = await data.json();
    //             setImageResults(json.image_results[0].original);
    //             if (json.image_results) { console.log(json.image_results[0]) };
    //         }
    //     }
    //     catch (error) { console.log(error) }
    // }

    // if (suggestions.length > 0) { console.log(suggestions) }

    //For Search
    const handleSearch = async () => {
        await youtubeSearch(inputText);
        setFlag(!flag);
        // dispatch(getSearchResults(searchedResults));
    }

    const handleToggleMenu = () => {
        dispatch(toggleMenu());
    }

    const handleDarkMode = () => {
        // dispatch(toggleDarkMode());
        const newDarkModeState = !isDarkMode;
        dispatch(toggleDarkMode(newDarkModeState));
        localStorage.setItem('isDarkMode', newDarkModeState.toString());
    }

    const handleInputChange = (text) => {
        setInputText(text)
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
            e.target.blur();
            setVisibleSuggestions(false);
        }
    }

    const handleEscapeKeyPress = (e) => {
        if (e.key === 'Escape') {
            setVisibleSuggestions(false);
        }
    };

    const isDarkMode = useSelector(store => store.app.isDarkMode);
    let style = "bg-gray-400"
    if (isDarkMode) { style = "bg-header-bg-night" }
    return (
        <div className="fixed w-full z-10">
            <div className="flex flex-col">
                <div className={"grid grid-flow-col p-3 shadow-xl bg-header-bg-day bg-cover bg-center justify-between " + style}>
                    <div className="flex col-span-1 items-center space-x-5">
                        {/* <img src="https://openclipart.org/image/800px/221605" alt="ham-menu" className="h-5 px-2 cursor-pointer" onClick={() => handleToggleMenu()} /> */}
                        <img src="https://icon-library.com/images/white-hamburger-menu-icon/white-hamburger-menu-icon-11.jpg" alt="ham-menu" className="h-9 px-1 cursor-pointer" onClick={() => handleToggleMenu()} />
                        {/* <img src="https://thenounproject.com/api/private/icons/289332/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" alt="ham-menu" className="h-10 px-1 cursor-pointer" onClick={() => handleToggleMenu()} /> */}
                        {/* <img src="https://raw.githubusercontent.com/kanishk6103/portfolio-website/main/images/logo.png" alt="logo" className="h-10" /> */}
                        {/* <Link to="/"><img src={Logo} alt="logo" className="h-10" /></Link> */}
                        <img src={Logo} alt="logo" className="h-10" />
                    </div>
                    <div className="col-span-10 flex items-center justify-center" onFocus={() => { setVisibleSuggestions(true) }} onKeyDown={(e) => { handleEnter(e) }}>
                        <input placeholder="Search.." type="text" value={inputText} className="rounded-s-full px-4 py-2 w-7/12 border-2 border-gray-500" onChange={e => { handleInputChange(e.target.value) }} onKeyDown={(e) => { handleEscapeKeyPress(e) }} />
                        <button className="bg-gray-500 p-[6px] rounded-e-full shadow-lg py-2" onClick={() => { handleSearch() }}>
                            <img src="https://www.freepnglogos.com/uploads/search-png/search-very-basic-icon-ios-iconset-icons-7.png" alt="" className="h-7 mx-3" />
                        </button>
                        {(suggestions.length !== 0) && (inputText) ?
                            visibleSuggestions && <div className="bg-white rounded-xl mr-[6.5%] absolute w-[32%] px-6 py-2 m-4 top-[60%] lg:top-[55%] shadow-lg border-gray-200">
                                <ul className="flex flex-col space-y-2" onBlur={() => { setVisibleSuggestions(false) }}>
                                    {suggestions.map((s) => {
                                        return <li key={s} className="hover:bg-gray-200 px-2 rounded-lg" onClick={() => { setInputText(s[0]); setVisibleSuggestions(false); setTimeout(() => { handleSearch(); }, 100); }}>{s[0]}</li>
                                    })}
                                </ul>
                            </div> :
                            null}
                    </div>
                    <div className="flex">
                        <button onClick={() => handleDarkMode()} className={!isDarkMode ? "text-gray-800 backdrop-blur-sm bg-white/20 p-2 m-2 rounded-lg items-center" : "text-white backdrop-blur-sm bg-black/40 p-2 m-2 rounded-lg items-center"}>
                            Toggle Dark Mode
                        </button>
                        {/* <ToggleSwitch /> */}
                    </div>
                    <div className="col-span-1">
                        <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt="user-icon" className="h-12 m-5" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header



/* onClick={() => handleSuggestionClick(s[0])}*/