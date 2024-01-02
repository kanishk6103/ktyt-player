import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice'

const MainContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu());
    }, [])
    return (
        <div className='mt-28'>
            <ButtonList />
            <VideoContainer />
        </div>
    )
}

export default MainContainer