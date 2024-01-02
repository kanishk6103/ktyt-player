import React from "react";
const MenuItem = ({ name, logo }) => {
    return (
        <div className="flex space-x-2 text-xl">
            <div dangerouslySetInnerHTML={{ __html: logo }} />
            <span>{name}</span>
        </div>
    );
}

export default MenuItem;