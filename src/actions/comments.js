import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_COMMENTS } from "./types";

export const fetchComments = postId => async dispatch => {
    const response = await jsonPlaceholder.get(`/posts/${postId}/comments`);

    dispatch({ type: FETCH_COMMENTS, payload: response.data });
};
