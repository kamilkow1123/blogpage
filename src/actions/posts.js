import resultsAPI from "../apis/resultsAPI";
import {
    FETCH_POSTS,
    FETCH_POST,
    FETCH_AUTHORS_POSTS,
    CREATE_POST,
} from "./types";
import { tokenConfig } from "./auth";

export const fetchPosts = () => async (dispatch, getState) => {
    const response = await resultsAPI.get("/post", tokenConfig(getState));

    dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = id => async (dispatch, getState) => {
    const response = await resultsAPI.get(`/post/${id}`, tokenConfig(getState));

    dispatch({ type: FETCH_POST, payload: response.data.post });
};

export const fetchAuthorsPosts = username => async (dispatch, getState) => {
    const response = await resultsAPI.get(
        `/post?author=${username}`,
        tokenConfig(getState)
    );
    // console.log(response);

    dispatch({ type: FETCH_AUTHORS_POSTS, payload: response.data.posts });
};

export const createPost = formValues => async (dispatch, getState) => {
    //get token from state
    const token = getState().auth.auth_token;

    //headers
    const config = {
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
        },
    };

    //if token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    var body = [];
    for (var property in formValues) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(formValues[property]);
        body.push(encodedKey + "=" + encodedValue);
    }
    body = body.join("&");

    try {
        await resultsAPI.post("/post", body, config);

        // console.log(response);

        dispatch({ type: CREATE_POST });
    } catch (err) {
        console.log(err);
    }
};
