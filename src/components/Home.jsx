import React from "react";
import PostsList from "./PostsList";
import Navbar from "./Navbar";

const Home = () => {
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

export default Home;
