import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";
import {
    FETCH_POSTS,
    FETCH_POST,
    FETCH_USER,
    FETCH_COMMENTS,
    ADD_POST_TO_FAV,
    ADD_COMMENT_TO_FAV,
    REMOVE_POST_FROM_FAV,
    REMOVE_COMMENT_FROM_FAV,
    FETCH_FAV_POST,
    FETCH_FAV_COMMENT,
} from "./types";

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/posts/${id}`);

    dispatch({ type: FETCH_POST, payload: response.data });
};

export const fetchUser = id => dispatch => {
    _fetchUser(id, dispatch);
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: FETCH_USER, payload: response.data });
});

export const fetchComments = postId => async dispatch => {
    const response = await jsonPlaceholder.get(`/posts/${postId}/comments`);

    dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const addPostToFav = postId => async dispatch => {
    dispatch({ type: ADD_POST_TO_FAV, payload: postId });
};

export const addCommentToFav = commentId => async dispatch => {
    dispatch({ type: ADD_COMMENT_TO_FAV, payload: commentId });
};

export const removePostFromFav = postId => dispatch => {
    dispatch({ type: REMOVE_POST_FROM_FAV, payload: postId });
};

export const removeCommentFromFav = commentId => dispatch => {
    dispatch({ type: REMOVE_COMMENT_FROM_FAV, payload: commentId });
};

export const fetchFavPost = postId => async dispatch => {
    const response = await jsonPlaceholder.get(`/posts/${postId}`);

    dispatch({ type: FETCH_FAV_POST, payload: response.data });
};

export const fetchFavComment = commentId => async dispatch => {
    const response = await jsonPlaceholder.get(`/comments/${commentId}`);

    dispatch({ type: FETCH_FAV_COMMENT, payload: response.data });
};
