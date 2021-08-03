import resultsAPI from "../apis/resultsAPI";
import { FETCH_POSTS, FETCH_POST, FETCH_AUTHORS_POSTS } from "./types";
import { tokenConfig } from "./auth";

export const fetchPosts = () => async (dispatch, getState) => {
    const response = await resultsAPI.get("/post", tokenConfig(getState));

    dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = id => async (dispatch, getState) => {
    const response = await resultsAPI.get(`/post/${id}`, tokenConfig(getState));

    dispatch({ type: FETCH_POST, payload: response.data.post });
};

export const fetchAuthorsPosts = username => async (dispatch, getState) => {
    const response = await resultsAPI.get(
        `/post?author=${username}`,
        tokenConfig(getState)
    );
    // console.log(response);

    dispatch({ type: FETCH_AUTHORS_POSTS, payload: response.data.posts });
};
