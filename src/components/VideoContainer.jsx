import React, { useEffect, useState } from 'react'
import { YOUTUBE_URL } from '../constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchVideoCard from './SearchVideoCard';
import Shimmer from './Shimmer';
import SearchShimmerCard from './SearchShimmerCard';
import axios from 'axios';
const VideoContainer = () => {
    const [videoitems, setVideoItems] = useState([]);

    //For search
    const searchedResults = useSelector(store => store.app.areSearchedResults)
    // console.log(searchedResults);

    useEffect(() => {
        try {
            getPopularVideos();
        }
        catch (error) { console.log(error) }
    }, []);

    const getPopularVideos = async () => {
        try {
            // const data = await fetch(YOUTUBE_URL);
            // const json = await data.json();
            const response = await axios.get("http://localhost:4000/api/getPopularVideos");
            const data = await response.data;
            setVideoItems(data)
        }
        catch (error) { console.log(error) }
        // console.log(json.items)
    }
    // console.log(searchedResults.length)

    return (searchedResults.length > 0) ?
        (searchedResults.length === 0 ? <SearchShimmerCard /> :
            <div className='p-5 ml-20 '>
                <div className='flex flex-col flex-wrap'>
                    {/* <div className='flex flex-row'> */}
                    {searchedResults.map((singleVideoItem) => {
                        return singleVideoItem.id.kind !== "youtube#channel" ?
                            <Link to={"/watch?v=" + singleVideoItem.id.videoId} key={singleVideoItem.id.videoId}><SearchVideoCard info={singleVideoItem} /></Link> :
                            <Link to={"/user?id=" + singleVideoItem.id.channelId} key={singleVideoItem.id.channelId}><SearchVideoCard info={singleVideoItem} /></Link>
                        {/* <Link to={"/watch?v=" + singleVideoItem.id.videoId} state={{ info: singleVideoItem }} key={singleVideoItem.id.videoId}><SearchVideoCard info={singleVideoItem} /></Link>: */ }
                    })}
                </div>
            </div>
        ) :
        (videoitems.length === 0 ? <Shimmer /> :
            <div className='p-5 m-5'>
                {/* <div className='flex flex-row flex-wrap lg:grid lg:grid-flow-row lg:grid-cols-3'> */}
                <div className='flex flex-row flex-wrap justify-evenly'>
                    {/* <div className='flex flex-row'> */}
                    {videoitems.map((singleVideoItem) => {
                        return <Link to={"/watch?v=" + singleVideoItem.id} key={singleVideoItem.id}><VideoCard info={singleVideoItem} /></Link>
                        {/* return <Link to={"/watch?v=" + singleVideoItem.id} state={{ info: singleVideoItem }} key={singleVideoItem.id}><VideoCard info={singleVideoItem} /></Link> */ }
                    })}
                </div>
            </div>
        )
}


export default VideoContainer

