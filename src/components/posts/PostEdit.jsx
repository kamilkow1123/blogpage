import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { editPost } from "../../actions/posts";
import { fetchPost } from "../../actions/posts";
import _ from "lodash";

const PostEdit = ({ fetchPost, post, editPost }) => {
    const { id } = useParams();
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(
        () => {
            fetchPost(id);
        },
        [ id, fetchPost ]
    );

    const onSubmit = formValues => {
        editPost(id, formValues);
    };

    return (
        <div>
            <Navbar toggle={toggle} />
            <Sidebar toggle={toggle} isOpen={isOpen} />
            <PostForm
                onSubmit={onSubmit}
                initialValues={_.pick(
                    post,
                    "title",
                    "description",
                    "content",
                    "tagList"
                )}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        post : state.posts.currentPost,
    };
};

export default connect(mapStateToProps, { editPost, fetchPost })(PostEdit);
