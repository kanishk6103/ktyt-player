// import React, { useEffect, useState } from 'react'
import { thumbsUpIcon, commentIcon, convertISO } from '../constants'
import { formatNumber } from '../utils/helper'
const VideoCard = ({ info }) => {
    // console.log(info)
    const { snippet, statistics, contentDetails } = info
    // eslint-disable-next-line
    const { channelTitle, title, thumbnails, channelId } = snippet
    // eslint-disable-next-line
    const { commentCount, favoriteCount, likeCount, viewCount } = statistics
    // eslint-disable-next-line
    const { high, medium } = thumbnails
    const { duration } = contentDetails
    // const newDurationDay = convertISO(duration).day / (3600 * 24);
    // const newDurationHour = convertISO(duration).hour / 3600;
    const newDurationMin = convertISO(duration).minute / 60;
    const newDurationSec = convertISO(duration).second;

    // if (!info) return <h1>Loading</h1>
    // const [channelInfo, setChannelInfo] = useState([]);
    // useEffect(() => {
    //     try { getChannelInfo(); }
    //     catch { }
    // }, []);
    // const getChannelInfo = async () => {
    //     const data = await fetch(CHANNEL_INFO(channelId));
    //     const json = await data.json();
    //     console.log(json.items[0])
    //     setChannelInfo(json.items[0])
    // }
    // console.log(CHANNEL_INFO(channelId))
    // console.log(newDuration) 
    const formattedViewCount = formatNumber(viewCount);
    const formattedLikeCount = formatNumber(likeCount);
    const formattedCommentCount = formatNumber(commentCount);
    return (
        <div className='w-min mx-8 my-5'>
            <div className='w-max rounded-2xl flex flex-col items-end relative'>
                <img className='rounded-2xl' src={medium.url} alt='thumbail' />
                <span className='bg-gray-800 text-white p-1 rounded-lg absolute bottom-0'>{String(newDurationMin).padStart(2, '0')}:{String(newDurationSec).padStart(2, '0')}</span>
            </div>
            <div className='flex flex-col flex-wrap'>
                {/* <div><img /></div> */}
                <h3 className='font-bold'>{title}</h3>
                <h4 className='text-sm'>{channelTitle}</h4>
                <div>
                    <h4>{formattedViewCount} views</h4>
                    <div className='flex flex-row space-x-5 my-2'>
                        <h4 className='flex items-center'><img src={thumbsUpIcon} alt="thumbs-up-icon" className='h-5 w-5 mx-2' />{formattedLikeCount}</h4>
                        <h4 className='flex items-center'><img src={commentIcon} alt="comment-icon" className='h-5 w-5 mx-2' />{formattedCommentCount}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard