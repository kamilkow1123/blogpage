import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Favourtites from "./components/Favourtites";
import Home from "./components/Home";
import Post from "./components/posts/Post";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import AuthorPage from "./components/AuthorPage";
import { loadUser } from "./actions/auth";
import { connect } from "react-redux";
import history from "./history";
import PostCreate from "./components/posts/PostCreate";
import PostEdit from "./components/posts/PostEdit";

const App = ({ loadUser }) => {
    useEffect(() => {
        loadUser();
    });

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/post/edit/:id" component={PostEdit} />
                <Route exact path="/post/:id" children={<Post />} />
                <Route exact path="/new" component={PostCreate} />
                <PrivateRoute
                    exact
                    path="/favourites"
                    component={Favourtites}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/user/:username" component={AuthorPage} />
                <Route exact path="/" component={Home} />
                <Route exact path="/:page" component={Home} />
            </Switch>
        </Router>
    );
};

export default connect(null, { loadUser })(App);
