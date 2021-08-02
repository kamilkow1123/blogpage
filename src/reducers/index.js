import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsReducer";
import authReducer from "./authReducer";

export default combineReducers({
    posts    : postsReducer,
    users    : usersReducer,
    comments : commentsReducer,
    auth     : authReducer,
});
