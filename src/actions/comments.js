import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_COMMENTS } from "./types";
import { tokenConfig } from "./auth";

export const fetchComments = postId => async (dispatch, getState) => {
    const response = await jsonPlaceholder.get(
        `/post/${postId}/comments`,
        tokenConfig(getState)
    );

    dispatch({ type: FETCH_COMMENTS, payload: response.data.comments });
};
