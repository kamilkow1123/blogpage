import resultsAPI from "../apis/resultsAPI";
import {
    ADD_POST_TO_FAV,
    ADD_COMMENT_TO_FAV,
    REMOVE_POST_FROM_FAV,
    REMOVE_COMMENT_FROM_FAV,
    FETCH_FAV_POSTS,
    FETCH_FAV_COMMENTS,
} from "./types";
import { tokenConfig } from "./auth";

export const addPostToFav = postId => async (dispatch, getState) => {
    await resultsAPI.post(
        `/post/${postId}/favorite`,
        null,
        tokenConfig(getState)
    );

    dispatch({ type: ADD_POST_TO_FAV, payload: postId });
};

export const addCommentToFav = commentId => async (dispatch, getState) => {
    await resultsAPI.post(
        `/comment/${commentId}/favorite`,
        null,
        tokenConfig(getState)
    );

    dispatch({ type: ADD_COMMENT_TO_FAV, payload: commentId });
};

export const removePostFromFav = postId => async (dispatch, getState) => {
    await resultsAPI.delete(`/post/${postId}/favorite`, tokenConfig(getState));

    dispatch({ type: REMOVE_POST_FROM_FAV, payload: postId });
};

export const removeCommentFromFav = commentId => async (dispatch, getState) => {
    await resultsAPI.delete(
        `/comment/${commentId}/favorite`,
        tokenConfig(getState)
    );

    dispatch({ type: REMOVE_COMMENT_FROM_FAV, payload: commentId });
};

export const fetchFavPosts = username => async dispatch => {
    const response = await resultsAPI.get(`/user/${username}/fav_posts`);

    dispatch({ type: FETCH_FAV_POSTS, payload: response.data.posts });
};

export const fetchFavComments = username => async dispatch => {
    const response = await resultsAPI.get(`/user/${username}/fav_comments`);

    dispatch({ type: FETCH_FAV_COMMENTS, payload: response.data.comments });
};
