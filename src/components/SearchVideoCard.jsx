// import React, { useEffect, useState } from 'react'
const SearchVideoCard = ({ info }) => {
    // console.log(info)
    const { snippet, id } = info
    const { channelTitle, title, thumbnails, description } = snippet
    const { high, medium } = thumbnails
    // console.log(description)
    return (
        <div className='w-max m-5 flex items-center'>
            <div className='w-max rounded-2xl flex flex-col items-end'>
                {/* { */}
                {/* kind === "youtube#channel" ? <img className='rounded-full' src={medium.url} alt='thumbail' /> : */}
                <img className='rounded-2xl' src={medium.url} alt='thumbail' />
                {/* } */}
            </div>
            <div className='flex flex-col flex-wrap ml-10 space-y-3'>
                {/* <div><img /></div> */}
                <h3 className='text-lg font-bold'>{title}</h3>
                <h4 className='text-sm font-semibold ml-2'>{channelTitle}</h4>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}

export default SearchVideoCard