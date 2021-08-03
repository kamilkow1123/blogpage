import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/users";

class AuthorPage extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.username);
    }

    render() {
        return !this.props.user ? null : (
            <div>
                <h1>{`${this.props.user.first_name} ${this.props.user
                    .last_name}`}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user : state.users.find(
            user => user.username === ownProps.match.params.username
        ),
    };
};

export default connect(mapStateToProps, { fetchUser })(AuthorPage);
