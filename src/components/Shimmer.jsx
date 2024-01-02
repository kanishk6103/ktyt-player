import ShimmerCard from "./ShimmerCard";

const Shimmer = () => {
    const arr = Array(20).fill("");
    return (
        <div className="px-10 mx-6 my-3 flex flex-wrap justify-evenly w-full">
            {arr.map((e, i) => {
                return <ShimmerCard key={i} />
            })}
        </div>
    )
}

export default Shimmer;