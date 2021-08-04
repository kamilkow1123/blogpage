import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";

const PostCreate = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Navbar toggle={toggle} />
            <Sidebar toggle={toggle} isOpen={isOpen} />
            <h1>Post Create</h1>
        </div>
    );
};

export default PostCreate;
