import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Favourtites from "./components/Favourtites";
import Home from "./components/Home";
import Post from "./components/Post";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/post/:id" children={<Post />} />
                <Route path="/favourites" component={Favourtites} exact />
            </Switch>
        </Router>
    );
};

export default App;
