import { thumbsUpIcon, commentIcon, convertISO } from '../constants'
const ChannelCard = ({ info }) => {
    const { snippet, id } = info
    const { channelTitle, title, thumbnails, channelId } = snippet
    const { high, medium } = thumbnails
    return (
        <div className='w-min m-5'>
            <div className='w-max rounded-2xl flex flex-col items-end'>
                <img className='rounded-2xl' src={medium.url} alt='thumbail' />
            </div>
            <div className='flex flex-col flex-wrap'>
                <h3 className='font-bold'>{title}</h3>
                <h4 className='text-sm'>{channelTitle}</h4>
            </div>
        </div>
    )
}

export default ChannelCard