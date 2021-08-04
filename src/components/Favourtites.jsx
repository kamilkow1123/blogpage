import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import AuthorHeader from "./AuthorHeader";
import {
    removePostFromFav,
    removeCommentFromFav,
    fetchFavPosts,
    fetchFavComments,
} from "../actions/fav";
import { loadUser } from "../actions/auth";
import ScrollToTop from "../ScrollToTop";
import { FaTrash } from "react-icons/fa";

const Favourtites = ({
    fetchFavPosts,
    fetchFavComments,
    favPosts,
    favComments,
    favPostsIds,
    favCommentsIds,
    removePostFromFav,
    removeCommentFromFav,
    user,
    loadUser,
}) => {
    useEffect(
        () => {
            if (user) {
                fetchFavPosts(user.username);
                fetchFavComments(user.username);
            } else {
                loadUser();
            }
        },
        [
            favPostsIds,
            favCommentsIds,
            fetchFavPosts,
            fetchFavComments,
            user,
            loadUser,
        ]
    );

    const renderFavPosts = () => {
        return favPosts.map(post => {
            return (
                <div key={post.id} className="fav-post">
                    <div>
                        <h2 className="fav-post__title">{post.title}</h2>
                        <div className="fav-post__author">
                            <AuthorHeader username={post.author.username} />
                        </div>
                        <div>{post.description}</div>
                    </div>
                    <div className="fav-post__buttons">
                        <Link
                            to={`/post/${post.id}`}
                            className="fav-post__link"
                        >
                            View the post
                        </Link>
                        <div
                            onClick={() => handleRemovingPost(post.id)}
                            className="fav-post__fav"
                        >
                            <FaTrash />
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderFavComments = () => {
        return favComments.map(comment => {
            return (
                <div key={comment.id} className="fav-comment">
                    {/* <h3 className="fav-comment__title">{comment.name}</h3> */}
                    <h4 className="fav-comment__author">
                        by {comment.author.username}
                    </h4>
                    <div className="fav-comment__body">
                        <p>{comment.content}</p>
                    </div>
                    <div className="fav-comment__buttons">
                        <Link
                            to={`/post/${comment.postId}`}
                            className="fav-comment__link"
                        >
                            View the post
                        </Link>
                        <div
                            onClick={() => handleRemovingComment(comment.id)}
                            className="fav-comment__fav"
                        >
                            <FaTrash />
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleRemovingComment = commentId => {
        removeCommentFromFav(commentId);
    };

    const handleRemovingPost = postId => {
        removePostFromFav(postId);
    };

    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <div className="fav-container">
                <div className="fav">
                    <h1 className="fav__title">Favourites</h1>
                    <h2 className="fav__header">Posts</h2>
                    <div className="fav__wrapper">{renderFavPosts()}</div>
                    <h2 className="fav__header">Comments</h2>
                    {renderFavComments()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        favPostsIds    : state.posts.favouritePostsIds,
        favCommentsIds : state.comments.favouriteCommentsIds,
        favPosts       : state.posts.favouritePosts,
        favComments    : state.comments.favouriteComments,
        user           : state.auth.user,
    };
};

export default connect(mapStateToProps, {
    removePostFromFav,
    removeCommentFromFav,
    fetchFavPosts,
    fetchFavComments,
    loadUser,
})(Favourtites);
