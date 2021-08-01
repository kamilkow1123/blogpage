import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_USER } from "./types";
import _ from "lodash";

export const fetchUser = username => dispatch => {
    _fetchUser(username, dispatch);
};

const _fetchUser = _.memoize(async (username, dispatch) => {
    const response = await jsonPlaceholder.get(`/user/${username}`);

    dispatch({ type: FETCH_USER, payload: response.data.user });
});
