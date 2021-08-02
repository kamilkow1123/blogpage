import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./types";
import resultsAPI from "../apis/resultsAPI";

//check token & load user
export const loadUser = () => async (dispatch, getState) => {
    //User Loading
    dispatch({ type: USER_LOADING });

    try {
        const response = await resultsAPI.get(
            "auth/users/me/",
            tokenConfig(getState)
        );

        dispatch({
            type    : USER_LOADED,
            payload : response.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type : AUTH_ERROR,
        });
    }
};

//login user
export const login = (email, password) => async dispatch => {
    //headers
    const config = {
        headers : {
            "Content-Type" : "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({ email, password });

    try {
        const response = await resultsAPI.post(
            "auth/token/login/",
            body,
            config
        );

        dispatch({
            type    : LOGIN_SUCCESS,
            payload : response.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type : LOGIN_FAIL,
        });
    }
};

//register user
export const register = details => async dispatch => {
    //headers
    const config = {
        headers : {
            "Content-Type" : "application/json",
        },
    };

    //Request body
    const body = JSON.stringify(details);
    // console.log(body);

    try {
        const response = await resultsAPI.post("auth/users/", body, config);

        dispatch({
            type : REGISTER_SUCCESS,
        });
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type    : REGISTER_FAIL,
            payload : err.response.data,
        });
    }
};

// LOGOUT
export const logout = () => async (dispatch, getState) => {
    try {
        const response = await resultsAPI.post(
            "auth/token/logout/",
            null,
            tokenConfig(getState)
        );

        dispatch({
            type : LOGOUT_SUCCESS,
        });
    } catch (err) {
        console.log(err);
    }
};

//setup config with token - helper function
export const tokenConfig = getState => {
    //get token from state
    const token = getState().auth.auth_token;

    //headers
    const config = {
        headers : {
            "Content-Type" : "application/json",
        },
    };

    //if token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};
