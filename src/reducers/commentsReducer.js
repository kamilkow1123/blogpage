import {
    FETCH_COMMENTS,
    FETCH_FAV_COMMENT,
    ADD_COMMENT_TO_FAV,
    REMOVE_COMMENT_FROM_FAV,
} from "../actions/types";

const INITIAL_STATE = {
    currentComments      : [],
    favouriteCommentsIds : JSON.parse(
        localStorage.getItem("favouriteCommentsIds")
    )
        ? JSON.parse(localStorage.getItem("favouriteCommentsIds"))
        : [],
    favouriteComments    : [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return { ...state, currentComments: action.payload };
        case FETCH_FAV_COMMENT:
            return {
                ...state,
                favouriteComments : [
                    ...state.favouriteComments,
                    action.payload,
                ],
            };
        case ADD_COMMENT_TO_FAV:
            localStorage.setItem(
                "favouriteCommentsIds",
                JSON.stringify([
                    ...state.favouriteCommentsIds,
                    action.payload,
                ])
            );
            return {
                ...state,
                favouriteCommentsIds : [
                    ...state.favouriteCommentsIds,
                    action.payload,
                ],
            };
        case REMOVE_COMMENT_FROM_FAV:
            localStorage.setItem(
                "favouriteCommentsIds",
                JSON.stringify(
                    state.favouriteCommentsIds.filter(
                        commentId => commentId !== action.payload
                    )
                )
            );
            return {
                ...state,
                favouriteCommentsIds : state.favouriteCommentsIds.filter(
                    commentId => commentId !== action.payload
                ),
                favouriteComments    : state.favouriteComments.filter(
                    comment => comment.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
