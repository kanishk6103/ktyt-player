const ShimmerCard = () => {
    return (
        <div className="w-[320px] h-[296px] flex flex-col space-y-2 m-5">
            <div className="bg-gray-500 w-full h-4/6 rounded-xl"></div>
            <div className="px-2 flex flex-col space-y-2">
                <div className="w-4/5 bg-gray-500 h-6"></div>
                <div className="w-3/5 bg-gray-500 h-4"></div>
                <div className="w-1/5 bg-gray-500 h-3"></div>
                <div className="w-1/5 bg-gray-500 h-3"></div>
                <div className="w-1/5 bg-gray-500 h-3"></div>
            </div>
        </div>
    )
}

export default ShimmerCard;