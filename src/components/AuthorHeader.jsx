import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/users";

const AuthorHeader = ({ username, fetchUser, user }) => {
    useEffect(
        () => {
            fetchUser(username);
        },
        [ username, fetchUser ]
    );

    return !user ? null : (
        <p className="author">by {`${user.first_name} ${user.last_name}`}</p>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user : state.users.find(user => user.username === ownProps.username),
    };
};

export default connect(mapStateToProps, { fetchUser })(AuthorHeader);
