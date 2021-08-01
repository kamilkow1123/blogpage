import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

const AuthorHeader = ({ userId, fetchUser, user }) => {
    useEffect(() => {
        fetchUser(userId);
    }, []);

    return !user ? null : (
        <p style={{ display: "inline-block" }}>by {user.name}</p>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps, { fetchUser })(AuthorHeader);
