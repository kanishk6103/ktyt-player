import Header from "./Header";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const err = useRouteError();
    const { status, statusText } = err;
    return (
        <div className="mt-28">
            <h1 className="no-underline text-inherit">Did you check the URL?</h1>
            <h2 className="no-underline text-inherit">You sure?</h2>
            <h3 className="no-underline text-inherit">{"Error " + status + ": " + statusText}</h3>
            <div className="flex justify-center">
                <button className="w-max cursor-pointer bg-transparent p-4 rounded-xl border-[5px] border-[rgb(122,122,122)]"><Link to="/">Back to home</Link></button>
            </div>
        </div>
    );
}

export default ErrorPage;