import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchComments } from "../actions/comments";
import { fetchPost } from "../actions/posts";
import {
    addPostToFav,
    addCommentToFav,
    removePostFromFav,
    removeCommentFromFav,
} from "../actions/fav";
import AuthorHeader from "./AuthorHeader";
import Navbar from "./Navbar";
import {
    FaRegHeart,
    FaHeart,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
} from "react-icons/fa";
import ScrollToTop from "../ScrollToTop";
import history from "../history";

const Post = ({
    fetchPost,
    post,
    fetchComments,
    comments,
    addPostToFav,
    addCommentToFav,
    removePostFromFav,
    removeCommentFromFav,
    favPostsIds,
    favCommentsIds,
    numOfPosts,
    isAuthenticated,
}) => {
    const { id } = useParams();

    useEffect(
        () => {
            fetchPost(id);
            fetchComments(id);
        },
        [ id, fetchPost, fetchComments, favPostsIds, favCommentsIds ]
    );

    const renderComments = () => {
        return comments.map(comment => {
            return (
                <div key={comment.id} className="comment">
                    <div className="comment__wrapper">
                        <h3 className="comment__title">{comment.content}</h3>
                        <div
                            className="comment__fav"
                            onClick={() =>
                                toggleCommentFav(comment.favorited, comment.id)}
                        >
                            {comment.favorited ? (
                                <FaHeart style={{ color: "#ff365f" }} />
                            ) : (
                                <FaRegHeart />
                            )}
                        </div>
                    </div>
                    <h4 className="comment__author">
                        by {comment.author.username}
                    </h4>
                    {/* <div className="comment__body">
                        <p>{comment.body}</p>
                    </div> */}
                </div>
            );
        });
    };

    const togglePostFav = () => {
        const postId = parseInt(id);

        if (isAuthenticated) {
            if (post.favorited) {
                removePostFromFav(postId);
            } else {
                addPostToFav(postId);
            }
        } else {
            history.push("/login");
        }
    };

    const toggleCommentFav = (isFav, commentId) => {
        if (isAuthenticated) {
            if (isFav) {
                removeCommentFromFav(commentId);
            } else {
                addCommentToFav(commentId);
            }
        } else {
            history.push("/login");
        }
    };

    return !post ? (
        <div>Loading...</div>
    ) : (
        <div>
            <ScrollToTop />
            <Navbar />
            <div className="post-container">
                <div className="post">
                    <div className="post__cover">
                        <h1 className="post__title">{post.title}</h1>
                        <div>
                            <AuthorHeader username={post.author.username} />
                        </div>
                    </div>
                    <div className="post__wrapper">
                        <div className="post__fav" onClick={togglePostFav}>
                            {post.favorited ? (
                                <FaHeart style={{ color: "#ff365f" }} />
                            ) : (
                                <FaRegHeart />
                            )}
                        </div>
                    </div>
                    <div className="post__body">
                        <p>{post.content}</p>
                    </div>
                    <div className="post__links">
                        <Link
                            to={`/post/${post.previous_post_id}`}
                            style={{
                                visibility : `${post.previous_post_id
                                    ? "visible"
                                    : "hidden"}`,
                            }}
                            className="post__link"
                        >
                            <FaAngleDoubleLeft />
                            Previous Post
                        </Link>
                        <Link
                            to={`/post/${post.next_post_id}`}
                            style={{
                                visibility : `${post.next_post_id
                                    ? "visible"
                                    : "hidden"}`,
                            }}
                            className="post__link"
                        >
                            Next Post
                            <FaAngleDoubleRight />
                        </Link>
                    </div>
                    <h2 className="post__header">Comments</h2>
                    {renderComments()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        post            : state.posts.currentPost,
        comments        : state.comments.currentComments,
        favPostsIds     : state.posts.favouritePostsIds,
        favCommentsIds  : state.comments.favouriteCommentsIds,
        numOfPosts      : state.posts.numOfPosts,
        isAuthenticated : state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, {
    fetchPost,
    fetchComments,
    addPostToFav,
    addCommentToFav,
    removePostFromFav,
    removeCommentFromFav,
})(Post);
