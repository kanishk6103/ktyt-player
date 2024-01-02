import { useMemo, useRef, useState } from "react";
import { findNthPrime } from "../utils/helper";
const Exprimental = () => {
    const [number, setNumber] = useState(0);
    const [isBlackBg, setIsBlackBg] = useState(false);
    // console.log("rendering...")
    // const fib = () => fibonacci(number);
    const nthPrime = useMemo(() => findNthPrime(number), [number]);
    let example = 69;
    const ref = useRef(69);
    // console.log(ref)
    const [stateExample, setStateExample] = useState(69);

    return (
        <>
            <div className="mt-28" >
                {/* <input type="number" className={"m-5 p-2 bg-gray-700 text-black rounded-lg " + (isBlackBg && "bg-gray-50 ")} value={number} onChange={e => setNumber(e.target.value)}></input>
                <h1>{nthPrime}</h1>
                <button onClick={() => { setIsBlackBg(!isBlackBg) }}>toggle input bg</button> */}
            </div>
            <div className="mt-28 flex flex-col">
                <div className="mt-5">
                    <h1>{example}</h1>
                    <button onClick={() => { example += 1; console.log(example) }}>+</button>
                </div>
                <div className="mt-5">
                    <h1>{stateExample}</h1>
                    <button onClick={() => { setStateExample(stateExample + 1) }}>+</button>
                </div>
                <div className="mt-5">
                    <h1>{ref.current}</h1>
                    <button onClick={() => { ref.current += 1; console.log(ref.current) }}>+</button>
                </div>
            </div>
        </>
    )
}

export default Exprimental;