import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_COMMENTS } from "./types";

export const fetchComments = postId => async dispatch => {
    const response = await jsonPlaceholder.get(`/post/${postId}/comments`);

    dispatch({ type: FETCH_COMMENTS, payload: response.data.comments });
};
