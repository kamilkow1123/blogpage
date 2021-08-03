import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";

const PrivateRoute = ({ component: Component, auth, loadUser, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <h2>Loading...</h2>;
            } else if (!auth.isAuthenticated && auth.auth_token === null) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth : state.auth,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
