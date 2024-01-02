import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleMenu, toggleDarkMode } from "../utils/appSlice";
import Logo from "../assets/Images/logo.png"
const Sidebar = () => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    useEffect(() => {
        const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
        dispatch(toggleDarkMode(isDarkMode));
    }, [dispatch]);
    const isDarkMode = useSelector(store => store.app.isDarkMode);
    let style = "bg-gray-400"
    if (isDarkMode) { style = "bg-gray-700" }
    // Early Return
    if (!isMenuOpen) return null;
    const handleToggleMenu = () => {
        dispatch(toggleMenu());
    }
    return (
        <div className="flex flex-row z-10">
            <div className={"px-3 pt-6 h-screen shadow-xl w-80 bg-sidebar-pattern bg-cover text-lg text-white fixed " + style}>
                <div className="flex col-span-1 items-center space-x-4 mt-3">
                    <img src="https://www.svgviewer.dev/static-svgs/448749/heavy-multiplication-x.svg" alt="ham-menu" className="h-5 px-3 cursor-pointer" onClick={() => handleToggleMenu()} />
                    <img src={Logo} alt="logo" className="h-10" />
                </div>
                <div className="flex flex-col space-y-3 my-24 mx-10 p-5 px-16 items-center backdrop-blur-sm bg-black/30 rounded-2xl">
                    <ul className="flex flex-col items-center">
                        <Link to="/" onClick={() => handleToggleMenu()}><li>Home</li></Link>
                        <li>Shorts</li>
                        <li>Library</li>
                        <li>History</li>
                    </ul>
                    <ul className="flex flex-col items-center">
                        <h1 className="font-bold pt-5">Subscriptions</h1>
                        <li>Music</li>
                        <li>Sports</li>
                        <li>Gaming</li>
                        <li>Movies</li>
                    </ul>
                    <ul className="flex flex-col items-center">
                        <h1 className="font-bold pt-5">Explore</h1>
                        <li>Music</li>
                        <li>Sports</li>
                        <li>Gaming</li>
                        <li>Movies</li>
                    </ul>
                </div>
            </div>
            <div className="ml-80 h-screen w-screen fixed backdrop-blur-sm z-10" onClick={() => handleToggleMenu()}>
            </div>
            <div className="ml-80 h-screen w-screen fixed bg-black opacity-30">
            </div>
        </div>
    )
}

export default Sidebar