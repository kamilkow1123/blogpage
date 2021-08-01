import jsonPlaceholder from "../apis/resultsAPI";
import { FETCH_USER } from "./types";
import _ from "lodash";

export const fetchUser = id => dispatch => {
    _fetchUser(id, dispatch);
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: FETCH_USER, payload: response.data });
});
