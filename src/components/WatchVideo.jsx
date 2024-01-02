import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import { YOUTUBE_API_KEY } from "../constants";
import CommentSection from "./CommentSection";
import { thumbsUpIcon } from "../constants";
import { Link } from "react-router-dom";
import LiveChat from "./LiveChat";
import { formatNumber } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
const WatchVideo = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [videoStats, setVideoStats] = useState();
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
    const handleDescriptionVisbility = () => {
        setIsDescriptionVisible(!isDescriptionVisible);
    }
    const videoID = searchParams.get("v");
    const videoEmbedURL = "https://www.youtube.com/embed/" + videoID + "?&autoplay=1"
    // const location = useLocation();
    // const videoInfo = location.state.info;
    // const videoTitle = videoInfo.snippet.title;
    // const channelTitle = videoInfo.snippet.channelTitle;
    useEffect(() => {
        dispatch(closeMenu());
    }, [dispatch])

    useEffect(() => {
        try {
            videoInfoCall();
            window.scrollTo(0, 0);
        }
        catch (error) { console.log(error) };
    }, [])

    const videoInfoCall = async () => {
        // const data = await fetch("https://www.googleapis.com/youtube/v3/videos?key=" + YOUTUBE_API_KEY + "&part=statistics&part=snippet&id=" + videoID);
        // const json = await data.json();
        // setVideoStats(json?.items[0]);
        // console.log(json)
        const response = await axios.get(`http://localhost:4000/api/videoInfoCall/${videoID}`);
        const data = await response.data;
        setVideoStats(data);
    }

    let channelId = ""
    let videoTitle = ""
    let channelTitle = ""
    let description = ""
    let commentCount = ""
    let likeCount = ""
    let viewCount = ""
    if (videoStats) {
        const { snippet, statistics } = videoStats;
        channelId = snippet.channelId;
        videoTitle = snippet.title;
        channelTitle = snippet.channelTitle;
        description = snippet.description;
        commentCount = statistics.commentCount
        likeCount = statistics.likeCount
        viewCount = statistics.viewCount
    }
    const formattedViewCount = formatNumber(viewCount);
    const formattedLikeCount = formatNumber(likeCount);
    const formattedCommentCount = formatNumber(commentCount);
    const [first, setFirst] = useState(true);
    const searchedResults = useSelector(store => store.app.areSearchedResults)
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to localhost:3000 when searchedResults changes
        if (first) { setFirst(false); return; }
        if (searchedResults) {
            navigate('/');
        }
    }, [searchedResults, navigate]);

    return (
        // <h1>Hello is this working?</h1>
        <div className="flex flex-col lg:flex lg:flex-row ml-8 mt-32 w-full">
            <div className="flex flex-col max-w-5xl">
                <div className="p-2 m-2 flex flex-col space-y-5 items-baseline">
                    <iframe id="player" width="1000" height="550" src={videoEmbedURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
                    <div className="w-full">
                        <div className="flex flex-row items-baseline justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xl font-bold">{videoTitle}</p>
                            </div>
                            <div className="flex space-x-8 items-center">
                                <p className="mx-3 flex items-center"><img src={thumbsUpIcon} alt="thumbs-up-icon" className='h-5 w-5 mx-2' />{formattedLikeCount}</p>
                                <p className="mx-3">{formattedViewCount} views</p>
                            </div>
                        </div>
                        <div className="w-max py-2">
                            <Link to={"/user?id=" + channelId}><p className="my-2">{channelTitle}</p></Link>
                        </div>
                        <div className="mt-5">
                            {isDescriptionVisible ?
                                <div className="">
                                    <p className="text-sm max-w-4xl">{description}</p>
                                    <button className="text-base text-gray-500" onClick={() => handleDescriptionVisbility()}>Hide</button>
                                </div> : <button className="text-base text-gray-500" onClick={() => handleDescriptionVisbility()}>Show description</button>}
                        </div>
                    </div>
                </div>
                <div className="m-3 p-3 break-words">
                    <CommentSection commentCount={formattedCommentCount} videoID={videoID} />
                </div>
            </div>
            <LiveChat />
        </div>
    )
}

export default WatchVideo;
