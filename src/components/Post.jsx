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

const Post = ({
    fetchPost,
    post,
    fetchComments,
    comments,
    addPostToFav,
    addCommentToFav,
    favPostsIds,
    favCommentsIds,
    removePostFromFav,
    removeCommentFromFav,
}) => {
    const { id } = useParams();

    useEffect(
        () => {
            fetchPost(id);
            fetchComments(id);
        },
        [ id, fetchPost, fetchComments ]
    );

    const renderComments = () => {
        return comments.map(comment => {
            return (
                <div key={comment.id} className="comment">
                    <div className="comment__wrapper">
                        <h3 className="comment__title">{comment.name}</h3>
                        <div
                            className="comment__fav"
                            onClick={() => toggleCommentFav(comment.id)}
                        >
                            {favCommentsIds.includes(comment.id) ? (
                                <FaHeart style={{ color: "#ff365f" }} />
                            ) : (
                                <FaRegHeart />
                            )}
                        </div>
                    </div>
                    <h4 className="comment__author">by {comment.email}</h4>
                    <div className="comment__body">
                        <p>{comment.body}</p>
                    </div>
                </div>
            );
        });
    };

    const togglePostFav = () => {
        const postId = parseInt(id);
        if (favPostsIds.includes(postId)) {
            removePostFromFav(postId);
        } else {
            addPostToFav(postId);
        }
    };

    const toggleCommentFav = commentId => {
        if (favCommentsIds.includes(commentId)) {
            removeCommentFromFav(commentId);
        } else {
            addCommentToFav(commentId);
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
                        <div className="post__author">
                            <AuthorHeader userId={post.userId} />
                        </div>
                    </div>
                    <div className="post__wrapper">
                        <div className="post__fav" onClick={togglePostFav}>
                            {favPostsIds.includes(parseInt(id)) ? (
                                <FaHeart style={{ color: "#ff365f" }} />
                            ) : (
                                <FaRegHeart />
                            )}
                        </div>
                    </div>
                    <div className="post__body">
                        <p>
                            {post.body}
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolorem recusandae sed hic dolorum, numquam
                            eveniet, inventore neque earum sit dignissimos non
                            debitis minus. Eligendi recusandae incidunt
                            reprehenderit temporibus, architecto dolore? Nulla
                            est ex aliquid, recusandae soluta mollitia sint
                            distinctio amet eligendi maxime? Tempore culpa
                            numquam quos non vitae nulla, praesentium molestiae
                            quam ipsum facilis commodi. Facilis nobis
                            accusantium alias minima. Nulla in voluptatibus
                            voluptatum dicta perferendis corrupti vitae! Odit,
                            ex facere nostrum explicabo corrupti expedita, ipsa
                            reiciendis assumenda deserunt dolor corporis aperiam
                            omnis, maxime quia quae commodi modi adipisci porro.
                            Doloribus libero, maiores molestiae eum nemo amet
                            obcaecati facere voluptatum nobis eaque mollitia
                            consectetur quos quam repudiandae commodi at
                            pariatur praesentium voluptatibus? Accusamus
                            laudantium illum tempora ullam reprehenderit. Est,
                            nemo? Labore, iure architecto ipsum libero,
                            repudiandae repellendus, voluptatem totam aspernatur
                            natus dolorum quaerat ut reiciendis consequuntur
                            culpa. Ut dolore harum error ipsam fugit omnis
                            corrupti repellat reprehenderit, assumenda autem
                            necessitatibus! Aliquid, ex optio? Quam deleniti,
                            nobis maiores ad assumenda eveniet ex magnam unde
                            voluptatibus obcaecati, beatae odio asperiores. Quis
                            velit cum quod suscipit explicabo nisi autem dolore
                            hic, ipsam incidunt. Dignissimos, voluptatum
                            quibusdam dolorum id nobis aperiam cumque amet,
                            alias officiis harum suscipit nulla doloremque
                            libero optio consequatur ipsam nam eos modi eveniet
                            officia quo. Itaque recusandae fugit nemo deserunt!
                            Veritatis quasi doloremque illo blanditiis! Fugiat
                            ex perferendis sit veniam itaque ipsa distinctio
                            laudantium eaque neque commodi voluptatibus aliquam,
                            incidunt dolorem fuga blanditiis adipisci molestias
                            repellat sunt, aliquid modi aspernatur? Nisi ullam
                            nam sint architecto laudantium cumque cupiditate
                            atque totam recusandae facere! Doloribus,
                            reprehenderit sapiente animi nisi alias excepturi,
                            voluptate explicabo, maiores debitis odit ex ipsam
                            aliquid obcaecati pariatur quas! Reiciendis ut quis
                            in facilis quibusdam dolores cupiditate blanditiis,
                            quasi dolorum error doloremque aperiam laboriosam
                            adipisci. Voluptatibus fuga libero atque reiciendis
                            consequatur nemo, dolore qui magni nam.
                        </p>
                    </div>
                    <div className="post__links">
                        <Link
                            to={`/post/${parseInt(id) - 1}`}
                            style={{
                                visibility : `${parseInt(id) > 1
                                    ? "visible"
                                    : "hidden"}`,
                            }}
                            className="post__link"
                        >
                            <FaAngleDoubleLeft />
                            Previous Post
                        </Link>
                        <Link
                            to={`/post/${parseInt(id) + 1}`}
                            style={{
                                visibility : `${parseInt(id) < 100
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
        post           : state.posts.currentPost,
        comments       : state.comments.currentComments,
        favPostsIds    : state.posts.favouritePostsIds,
        favCommentsIds : state.comments.favouriteCommentsIds,
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
