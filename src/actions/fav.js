import jsonPlaceholder from "../apis/resultsAPI";
import {
    ADD_POST_TO_FAV,
    ADD_COMMENT_TO_FAV,
    REMOVE_POST_FROM_FAV,
    REMOVE_COMMENT_FROM_FAV,
    FETCH_FAV_POST,
    FETCH_FAV_COMMENT,
} from "./types";
import { tokenConfig } from "./auth";

export const addPostToFav = postId => async (dispatch, getState) => {
    await jsonPlaceholder.post(
        `/post/${postId}/favorite`,
        null,
        tokenConfig(getState)
    );
    // console.log(response);

    dispatch({ type: ADD_POST_TO_FAV, payload: postId });
};

export const addCommentToFav = commentId => async (dispatch, getState) => {
    await jsonPlaceholder.post(
        `/comment/${commentId}/favorite`,
        null,
        tokenConfig(getState)
    );
    // console.log(response);

    dispatch({ type: ADD_COMMENT_TO_FAV, payload: commentId });
};

export const removePostFromFav = postId => async (dispatch, getState) => {
    await jsonPlaceholder.delete(
        `/post/${postId}/favorite`,
        tokenConfig(getState)
    );
    // console.log(response);

    dispatch({ type: REMOVE_POST_FROM_FAV, payload: postId });
};

export const removeCommentFromFav = commentId => async (dispatch, getState) => {
    await jsonPlaceholder.delete(
        `/comment/${commentId}/favorite`,
        tokenConfig(getState)
    );
    // console.log(response);

    dispatch({ type: REMOVE_COMMENT_FROM_FAV, payload: commentId });
};

export const fetchFavPost = postId => async dispatch => {
    const response = await jsonPlaceholder.get(`/post/${postId}`);

    dispatch({ type: FETCH_FAV_POST, payload: response.data.post });
};

export const fetchFavComment = commentId => async dispatch => {
    const response = await jsonPlaceholder.get(`/comment/${commentId}`);

    dispatch({ type: FETCH_FAV_COMMENT, payload: response.data.comment });
};
