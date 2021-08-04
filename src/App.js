import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Favourtites from "./components/Favourtites";
import Home from "./components/Home";
import Post from "./components/Post";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import AuthorPage from "./components/AuthorPage";
import { loadUser } from "./actions/auth";
import { connect } from "react-redux";
import history from "./history";

const App = ({ loadUser }) => {
    useEffect(() => {
        loadUser();
    });

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/post/:id" children={<Post />} />
                <PrivateRoute
                    path="/favourites"
                    component={Favourtites}
                    exact
                />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/:username" component={AuthorPage} exact />
            </Switch>
        </Router>
    );
};

export default connect(null, { loadUser })(App);
