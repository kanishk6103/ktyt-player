const LiveChatMessage = ({ name, message }) => {
    return (
        <div className="flex items-center space-x-2 mx-4 my-2">
            <div className="mx-4">
                <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt="user-icon" className="w-8" />
            </div>
            <div className="w-80">
                <span className="text-xs min-w-max font-semibold mr-2">{name}</span>
                <span className="text-xs">{message}</span>
            </div>
        </div>
    )
}

export default LiveChatMessage;