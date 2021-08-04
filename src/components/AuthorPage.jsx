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

    componentDidUpdate(prevProps) {
        if (
            this.props.match.params.username !== prevProps.match.params.username
        ) {
            this.props.fetchAuthorsPosts(this.props.match.params.username);
        }
    }

    renderPosts = () => {
        return this.props.posts.map(post => {
            return (
                <div key={post.id} className="author-post">
                    <div>
                        <h2 className="author-post__title">{post.title}</h2>

                        <div>{post.description}</div>
                    </div>
                    <div className="author-post__buttons">
                        <Link
                            to={`/post/${post.id}`}
                            className="author-post__link"
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
                        <h1 className="author__name">{`${this.props.user
                            .first_name} ${this.props.user.last_name}`}</h1>
                        <h2 className="author__username">
                            {this.props.user.username}
                        </h2>
                        <div className="author__photo">
                            <img src={this.props.user.imageURL} alt="author" />
                        </div>
                        <div className="author__bio">{this.props.user.bio}</div>
                        {this.props.isOwnProfile && (
                            <Link to="/favourites" className="author__fav-link">
                                Favourite Posts & Comments
                            </Link>
                        )}
                        <h2 className="author__header">social links</h2>
                        <div className="author__link">
                            {this.props.user.github_link}
                        </div>
                        <div className="author__link">
                            {this.props.user.linkedin_link}
                        </div>
                        <div className="author__link">
                            {this.props.user.facebook_link}
                        </div>
                        <h2 className="author__header">
                            {this.props.user.first_name}'s posts
                        </h2>
                        <div className="author__wrapper">
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user         : state.users.find(
            user => user.username === ownProps.match.params.username
        ),
        posts        : state.posts.authorsPosts,
        isOwnProfile : state.auth.user
            ? ownProps.match.params.username === state.auth.user.username
            : null,
    };
};

export default connect(mapStateToProps, {
    fetchUser,
    fetchAuthorsPosts,
})(AuthorPage);
