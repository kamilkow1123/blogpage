import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";
import AuthorHeader from "./AuthorHeader";
import { Link } from "react-router-dom";

const PostsList = ({ fetchPosts, posts }) => {
    useEffect(
        () => {
            fetchPosts();
        },
        [ fetchPosts ]
    );

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <div className="postlist__post" key={post.id}>
                    <div className="postlist__cover">
                        <img
                            src={`https://picsum.photos/750/300?random=${post.id}`}
                            alt="post"
                        />
                    </div>
                    <div className="postlist__content">
                        <div>
                            <div className="postlist__title">{post.title}</div>
                            <div className="postlist__author">
                                <AuthorHeader userId={post.userId} />
                            </div>
                        </div>
                        <div className="postlist__wrapper">
                            <Link
                                className="postlist__link"
                                to={`/post/${post.id}`}
                            >
                                read more
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return <div className="postlist">{renderPosts()}</div>;
};

const mapStateToProps = state => {
    return { posts: state.posts.listOfPosts };
};

export default connect(mapStateToProps, { fetchPosts })(PostsList);
