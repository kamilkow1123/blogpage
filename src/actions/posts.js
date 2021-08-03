import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_POSTS, FETCH_POST } from "./types";
import { tokenConfig } from "./auth";

export const fetchPosts = () => async (dispatch, getState) => {
    const response = await jsonPlaceholder.get("/post", tokenConfig(getState));

    dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = id => async (dispatch, getState) => {
    const response = await jsonPlaceholder.get(
        `/post/${id}`,
        tokenConfig(getState)
    );

    dispatch({ type: FETCH_POST, payload: response.data.post });
};
