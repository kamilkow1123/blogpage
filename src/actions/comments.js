import resultsAPI from "../apis/resultsAPI";
import { FETCH_COMMENTS, CREATE_COMMENT } from "./types";
import { tokenConfig } from "./auth";
import { formConfig } from "./posts";

export const fetchComments = postId => async (dispatch, getState) => {
    const response = await resultsAPI.get(
        `/post/${postId}/comments`,
        tokenConfig(getState)
    );

    dispatch({ type: FETCH_COMMENTS, payload: response.data.comments });
};

export const createComment = (formValues, postId) => async (
    dispatch,
    getState
) => {
    const { config, body } = formConfig(getState, formValues);

    try {
        const response = await resultsAPI.post(
            `/post/${postId}/comments`,
            body,
            config
        );

        // console.log(response);

        dispatch({ type: CREATE_COMMENT, payload: response.data.comment });
    } catch (err) {
        console.log(err);
        alert("Could not submit comment, try again.");
    }
};
