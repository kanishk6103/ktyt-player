import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import { YOUTUBE_API_KEY } from "../constants";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SearchVideoCard from "./SearchVideoCard";
import { formatNumber } from "../utils/helper";
import axios from "axios";

const ChannelPage = () => {
    const [searchParams] = useSearchParams();
    const channelParam = searchParams.get("id");
    const [channelStats, setChannelStats] = useState();
    const [channelVideos, setChannelVideos] = useState();
    // const location = useLocation();
    // const channelInfo = location.state.info;
    // const snippet = channelInfo.snippet;
    // const channelId = snippet.channelId;
    // const title = snippet.title;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu());
    }, [])
    const isDarkMode = useSelector(store => store.app.isDarkMode);
    useEffect(() => {
        try {
            channelInfoCall();
            channelVideoCall();
        }
        catch (error) { console.log(error) };
    }, [])
    const channelInfoCall = async () => {
        // const data = await fetch("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" + channelParam + "&key=" + YOUTUBE_API_KEY);
        // const json = await data.json();
        // setChannelStats(json?.items[0]);
        // console.log(json?.items[0])
        const response = await axios.get(`http://localhost:4000/api/channelInfo/${channelParam}`);
        const data = await response.data;
        setChannelStats(data);
    }

    const channelVideoCall = async () => {
        // const videoData = await fetch("https://www.googleapis.com/youtube/v3/search?key=" + YOUTUBE_API_KEY + "&channelId=" + channelParam + "&part=snippet,id&order=date&maxResults=25")
        // const videoJson = await videoData.json();
        // setChannelVideos(videoJson?.items)
        const response = await axios.get(`http://localhost:4000/api/channelVideoInfo/${channelParam}`);
        const data = await response.data;
        setChannelVideos(data)
    }
    let title = "";
    let description = ""
    let subscriberCount = ""
    let videoCount = ""
    let viewCount = ""
    let thumbnail = ""
    if (channelStats) {
        const { snippet, statistics } = channelStats;
        title = snippet.title;
        description = snippet.description;
        thumbnail = snippet.thumbnails.high.url;
        viewCount = statistics.viewCount
        subscriberCount = statistics.subscriberCount
        videoCount = statistics.videoCount
    }
    const formattedViewCount = formatNumber(viewCount);
    const formattedSubscriberCount = formatNumber(subscriberCount);
    const formattedVideoCount = formatNumber(subscriberCount);
    const style = isDarkMode ? "" : "bg-gray-200";
    return (
        <div className="flex flex-col justify-center items-baseline mt-28">
            <div className={"flex flex-row items-center m-8 space-x-5 p-5 rounded-xl " + style}>
                <img alt={title + "-image"} src={thumbnail} className={isDarkMode ? "h-72 w-72 rounded-full border-t-2 border-b-2 border-white" : "h-72 w-72 border-t-2 border-b-2"} />
                <div>
                    <h1 className="font-bold text-3xl">{title}</h1>
                    <h3 className="text-md p-2">{description}</h3>
                    <h3 className="p-2 font-semibold">Subscribers: {formattedSubscriberCount}</h3>
                    <h3 className="p-2 font-semibold">{title} has {formattedViewCount} views</h3>
                    <h3 className="p-2 font-semibold">Videos: {formattedVideoCount}</h3>
                </div>
            </div>
            <div className="px-7 py-3">
                <h1 className="text-lg font-bold">Videos:</h1>
                {channelVideos ?
                    <ul>
                        {channelVideos.map((singleChannelVideo) => {
                            return <Link to={"/watch?v=" + singleChannelVideo.id.videoId} key={singleChannelVideo.id.videoId}><li><SearchVideoCard info={singleChannelVideo} /></li></Link>
                        })}
                        {/* <li><SearchVideoCard info={channelVideos[0]} /></li> */}
                    </ul>
                    : <h1>hello</h1>}
            </div>
        </div>
    )
}

export default ChannelPage



// return (
//     // <h1>Hello is this working?</h1>
//     <div className="p-2 m-2">
//         <iframe id="player" width="1000" height="550" src={videoEmbedURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
//     </div>
// )