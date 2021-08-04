import React, { useState } from "react";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { createPost } from "../../actions/posts";

const PostCreate = ({ createPost }) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = formValues => {
        createPost(formValues);
    };

    return (
        <div>
            <Navbar toggle={toggle} />
            <Sidebar toggle={toggle} isOpen={isOpen} />
            <PostForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, { createPost })(PostCreate);
