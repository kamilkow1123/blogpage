import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/users";
import { fetchAuthorsPosts } from "../actions/posts";
import Navbar from "./Navbar";
import ScrollToTop from "../ScrollToTop";
import { Link } from "react-router-dom";

class AuthorPage extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.username);
        this.props.fetchAuthorsPosts(this.props.match.params.username);
    }

    renderPosts = () => {
        return this.props.posts.map(post => {
            return (
                <div key={post.id} className="author__post">
                    <div>
                        <h2 className="author__post__title">{post.title}</h2>

                        <div>{post.description}</div>
                    </div>
                    <div className="author__post__buttons">
                        <Link
                            to={`/post/${post.id}`}
                            className="author__post__link"
                        >
                            View the post
                        </Link>
                    </div>
                </div>
            );
        });
    };

    render() {
        return !this.props.user ? null : (
            <div>
                <ScrollToTop />
                <Navbar />
                <div className="author-container">
                    <div className="author">
                        <h1>{`${this.props.user.first_name} ${this.props.user
                            .last_name}`}</h1>
                        <div>{this.props.user.username}</div>
                        <img src={this.props.user.imageURL} alt="author" />
                        <div>{this.props.user.bio}</div>
                        <div>{this.props.user.github_link}</div>
                        <div>{this.props.user.linkedin_link}</div>
                        <div>{this.props.user.facebook_link}</div>
                        <h2>Posts</h2>
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user  : state.users.find(
            user => user.username === ownProps.match.params.username
        ),
        posts : state.posts.authorsPosts,
    };
};

export default connect(mapStateToProps, {
    fetchUser,
    fetchAuthorsPosts,
})(AuthorPage);
