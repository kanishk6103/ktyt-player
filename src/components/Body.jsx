import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Outlet } from 'react-router-dom';


const Body = () => {
    const isDarkMode = useSelector(store => store.app.isDarkMode);
    // let styles = "bg-day-body-bg bg-cover bg-fixed";
    let styles = "";
    // if (isDarkMode) { styles = "flex bg-dark-body-bg bg-cover bg-fixed text-white" }
    if (isDarkMode) { styles = "flex text-white bg-gray-900" }
    return (
        <div className={"flex " + styles}>
            <Sidebar className="" />
            {/* <MainContainer /> */}
            <Outlet />
        </div>
    )
}

export default Body