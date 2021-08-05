import {
    FETCH_COMMENTS,
    FETCH_FAV_COMMENTS,
    ADD_COMMENT_TO_FAV,
    REMOVE_COMMENT_FROM_FAV,
    CREATE_COMMENT,
    DELETE_COMMENT,
} from "../actions/types";

const INITIAL_STATE = {
    currentComments      : [],
    // favouriteCommentsIds : JSON.parse(
    //     localStorage.getItem("favouriteCommentsIds")
    // )
    //     ? JSON.parse(localStorage.getItem("favouriteCommentsIds"))
    //     : [],
    favouriteCommentsIds : [],
    favouriteComments    : [],
};

const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return { ...state, currentComments: action.payload };
        case FETCH_FAV_COMMENTS:
            return {
                ...state,
                favouriteComments : action.payload,
            };
        case ADD_COMMENT_TO_FAV:
            // localStorage.setItem(
            //     "favouriteCommentsIds",
            //     JSON.stringify([
            //         ...state.favouriteCommentsIds,
            //         action.payload,
            //     ])
            // );
            return {
                ...state,
                favouriteCommentsIds : [
                    ...state.favouriteCommentsIds,
                    action.payload,
                ],
            };
        case REMOVE_COMMENT_FROM_FAV:
            // localStorage.setItem(
            //     "favouriteCommentsIds",
            //     JSON.stringify(
            //         state.favouriteCommentsIds.filter(
            //             commentId => commentId !== action.payload
            //         )
            //     )
            // );
            return {
                ...state,
                favouriteCommentsIds : state.favouriteCommentsIds.filter(
                    commentId => commentId !== action.payload
                ),
                favouriteComments    : state.favouriteComments.filter(
                    comment => comment.id !== action.payload
                ),
            };

        case CREATE_COMMENT:
            return {
                ...state,
                currentComments : [ ...state.currentComments, action.payload ],
            };
        case DELETE_COMMENT:
            return {
                ...state,
                currentComments : state.currentComments.filter(
                    comment => comment.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default commentsReducer;
