import React, { useEffect, useState } from "react";
import PostsList from "./posts/PostsList";
import Navbar from "./Navbar";
import { loadUser } from "../actions/auth";
import { connect } from "react-redux";

const Home = ({ loadUser, user }) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!user) {
            loadUser();
        }
    });

    return (
        <div>
            <Navbar toggle={toggle} />
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
