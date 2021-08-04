import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/users";
import { Link } from "react-router-dom";

const AuthorHeader = ({ username, fetchUser, user }) => {
    useEffect(
        () => {
            fetchUser(username);
        },
        [ username, fetchUser ]
    );

    return !user ? null : (
        <Link to={`/${username}`} className="author-header">
            by {`${user.first_name} ${user.last_name}`}
        </Link>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user : state.users.find(user => user.username === ownProps.username),
    };
};

export default connect(mapStateToProps, { fetchUser })(AuthorHeader);
