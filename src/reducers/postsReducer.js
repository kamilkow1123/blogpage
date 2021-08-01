import {
    FETCH_POSTS,
    FETCH_POST,
    ADD_POST_TO_FAV,
    REMOVE_POST_FROM_FAV,
    FETCH_FAV_POST,
} from "../actions/types";

const INITIAL_STATE = {
    listOfPosts       : [],
    currentPost       : null,
    favouritePostsIds : JSON.parse(localStorage.getItem("favouritePostsIds"))
        ? JSON.parse(localStorage.getItem("favouritePostsIds"))
        : [],
    favouritePosts    : [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, listOfPosts: action.payload };
        case FETCH_POST:
            return { ...state, currentPost: action.payload };
        case FETCH_FAV_POST:
            return {
                ...state,
                favouritePosts : [ ...state.favouritePosts, action.payload ],
            };
        case ADD_POST_TO_FAV:
            localStorage.setItem(
                "favouritePostsIds",
                JSON.stringify([ ...state.favouritePostsIds, action.payload ])
            );
            return {
                ...state,
                favouritePostsIds : [
                    ...state.favouritePostsIds,
                    action.payload,
                ],
            };
        case REMOVE_POST_FROM_FAV:
            localStorage.setItem(
                "favouritePostsIds",
                JSON.stringify(
                    state.favouritePostsIds.filter(
                        postId => postId !== action.payload
                    )
                )
            );
            return {
                ...state,
                favouritePostsIds : state.favouritePostsIds.filter(
                    postId => postId !== action.payload
                ),
                favouritePosts    : state.favouritePosts.filter(
                    post => post.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
