import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";
import PostForm from "./PostForm";

const PostCreate = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = formValues => {
        console.log(formValues);
    };

    return (
        <div>
            <Navbar toggle={toggle} />
            <Sidebar toggle={toggle} isOpen={isOpen} />
            <PostForm onSubmit={onSubmit} />
        </div>
    );
};

export default PostCreate;
