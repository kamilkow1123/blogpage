import React, { useEffect } from "react";
import PostsList from "./PostsList";
import Navbar from "./Navbar";
import { loadUser } from "../actions/auth";
import { connect } from "react-redux";

const Home = ({ loadUser, user }) => {
    useEffect(() => {
        if (!user) {
            loadUser();
        }
    });

    return (
        <div>
            <Navbar />
            <div className="hero">
                <h1 className="hero__title">YOUR BLOG</h1>
            </div>
            <PostsList />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user : state.auth.user,
    };
};

export default connect(mapStateToProps, { loadUser })(Home);
