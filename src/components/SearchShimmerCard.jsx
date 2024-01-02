import ShimmerCard from "./ShimmerCard";
const SearchShimmerCard = () => {
    const arr = Array(20).fill("");
    return (
        <div className="px-10 mx-6 my-3 flex flex-col flex-wrap justify-evenly w-full">
            {arr.map((e, i) => {
                return <ShimmerCard />
            })}
        </div>
    )
}

export default SearchShimmerCard;