import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import AuthorHeader from "../AuthorHeader";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";

const PostsList = ({ fetchPosts, posts, numOfPages }) => {
    const { page } = useParams();

    useEffect(
        () => {
            fetchPosts(page);
        },
        [ fetchPosts, page ]
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

    const renderPageNav = () => {
        return _.times(numOfPages, index => (
            <Link to={`/${index + 1}`} className="postlist__page" key={index}>
                {index + 1}
            </Link>
        ));
    };

    return (
        <div className="postlist">
            <div className="postlist__container">{renderPosts()}</div>
            <div className="postlist__pages">
                <Link
                    to={`/${parseInt(page) - 1}`}
                    className="postlist__pages__button"
                    style={{
                        visibility : `${page > 1 ? "visible" : "hidden"}`,
                    }}
                >
                    Previous Page
                </Link>
                {renderPageNav()}
                <Link
                    to={`/${page ? parseInt(page) + 1 : 2}`}
                    className="postlist__pages__button"
                    style={{
                        visibility : `${page < numOfPages || !page
                            ? "visible"
                            : "hidden"}`,
                    }}
                >
                    Next Page
                </Link>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        posts      : state.posts.listOfPosts,
        numOfPages : Math.floor(state.posts.numOfPosts / 10) + 1,
    };
};

export default connect(mapStateToProps, { fetchPosts })(PostsList);
