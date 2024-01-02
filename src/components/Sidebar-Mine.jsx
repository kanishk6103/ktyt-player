import React from 'react'
import MenuItem from './misc/MenuItem'
import { menuItems } from '../constants'

const SidebarMine = () => {
    return (
        <div>
            <div className="flex items-center space-x-5 pl-3">
                <img src="https://openclipart.org/image/800px/221605" alt="ham-menu" className="h-5 px-2" />
                <img src="https://raw.githubusercontent.com/kanishk6103/portfolio-website/main/images/logo.png" alt="logo" className="h-10" />
            </div>
            <div className='flex flex-col space-y-5 px-10 py-2 items-baseline bg-gray-400 h-[100vh]'>
                {menuItems.map((singleMenuItem) => {
                    return <MenuItem key={singleMenuItem.name} name={singleMenuItem.name} logo={singleMenuItem.logo} />
                })}
            </div>
        </div>
    )
}

export default SidebarMine;