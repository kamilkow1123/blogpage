import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_POSTS, FETCH_POST } from "./types";

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get("/post");
    console.log(response);

    dispatch({ type: FETCH_POSTS, payload: response.data.posts });
};

export const fetchPost = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/posts/${id}`);

    dispatch({ type: FETCH_POST, payload: response.data });
};