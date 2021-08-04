import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import AuthorHeader from "../AuthorHeader";
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
                        <img src={post.imageURL} alt="post" />
                    </div>
                    <div className="postlist__content">
                        <div>
                            <div className="postlist__title">{post.title}</div>
                            <div className="postlist__author">
                                <AuthorHeader username={post.author.username} />
                            </div>
                            <div className="postlist__description">
                                {post.description}
                            </div>
                            <div className="postlist__tags">
                                {post.tagList.map(tag => {
                                    return (
                                        <div
                                            key={tag}
                                            className="postlist__tag"
                                        >
                                            {tag}
                                        </div>
                                    );
                                })}
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
