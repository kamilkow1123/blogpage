import resultsAPI from "../apis/resultsAPI";
import {
    FETCH_POSTS,
    FETCH_POST,
    FETCH_AUTHORS_POSTS,
    CREATE_POST,
    EDIT_POST,
} from "./types";
import { tokenConfig } from "./auth";
import history from "../history";

export const fetchPosts = page => async (dispatch, getState) => {
    if (!page) {
        page = 1;
    }
    const response = await resultsAPI.get(
        `/post?page=${page}`,
        tokenConfig(getState)
    );
    console.log(response);

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
    const { config, body } = postConfig(getState, formValues);

    try {
        await resultsAPI.post("/post", body, config);

        // console.log(response);

        dispatch({ type: CREATE_POST });
        history.push("/");
        // alert("Successfully created new post!");
    } catch (err) {
        console.log(err);
        alert("Could not create post, try again.");
    }
};

export const editPost = (id, formValues) => async (dispatch, getState) => {
    const { config, body } = postConfig(getState, formValues);

    try {
        await resultsAPI.put(`/post/${id}`, body, config);

        // console.log(response);

        dispatch({ type: EDIT_POST });
        history.push("/");
    } catch (err) {
        console.log(err);
        alert("Could not edit post, try again.");
    }
};

//setup config with token for post creation and editing
export const postConfig = (getState, formValues) => {
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

    let body = [];
    for (let property in formValues) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(formValues[property]);
        body.push(encodedKey + "=" + encodedValue);
    }
    body = body.join("&");

    return { config, body };
};
