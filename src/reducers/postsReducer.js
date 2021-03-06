import {
    FETCH_POSTS,
    FETCH_POST,
    FETCH_AUTHORS_POSTS,
    ADD_POST_TO_FAV,
    REMOVE_POST_FROM_FAV,
    FETCH_FAV_POSTS,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
} from "../actions/types";

const INITIAL_STATE = {
    listOfPosts       : [],
    numOfPosts        : 0,
    currentPost       : null,
    // favouritePostsIds : JSON.parse(localStorage.getItem("favouritePostsIds"))
    //     ? JSON.parse(localStorage.getItem("favouritePostsIds"))
    //     : [],
    favouritePostsIds : [],
    favouritePosts    : [],
    authorsPosts      : [],
};

const postsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                listOfPosts : action.payload.posts,
                numOfPosts  : action.payload.postsCount,
            };
        case FETCH_POST:
            return { ...state, currentPost: action.payload };
        case FETCH_AUTHORS_POSTS:
            return { ...state, authorsPosts: action.payload };
        case FETCH_FAV_POSTS:
            return {
                ...state,
                favouritePosts : action.payload,
            };
        case ADD_POST_TO_FAV:
            // localStorage.setItem(
            //     "favouritePostsIds",
            //     JSON.stringify([ ...state.favouritePostsIds, action.payload ])
            // );
            return {
                ...state,
                favouritePostsIds : [
                    ...state.favouritePostsIds,
                    action.payload,
                ],
            };
        case REMOVE_POST_FROM_FAV:
            // localStorage.setItem(
            //     "favouritePostsIds",
            //     JSON.stringify(
            //         state.favouritePostsIds.filter(
            //             postId => postId !== action.payload
            //         )
            //     )
            // );

            return {
                ...state,
                favouritePostsIds : state.favouritePostsIds.filter(
                    postId => postId !== action.payload
                ),
                favouritePosts    : state.favouritePosts.filter(
                    post => post.id !== action.payload
                ),
            };
        case CREATE_POST:
        case EDIT_POST:
            return { ...state };
        case DELETE_POST:
            return {
                ...state,
                authorsPosts : state.authorsPosts.filter(
                    post => post.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default postsReducer;
