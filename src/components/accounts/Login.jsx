import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

const Login = ({ login, errorMessage, isAuthenticated }) => {
    const [ error, setError ] = useState("");

    useEffect(
        () => {
            if (errorMessage !== "") {
                setError("Details do not match!");
            }
        },
        [ errorMessage ]
    );

    const Login = ({ username, password }) => {
        login(username, password);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div className="login">
                    <Link
                        to="/"
                        className="login__back-button login__back-button--top"
                    >
                        <span>
                            <FaArrowLeft />
                        </span>{" "}
                        back
                    </Link>
                    <LoginForm Login={Login} error={error} />
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated,
        errorMessage    : state.auth.error,
        user            : state.auth.user,
    };
};

export default connect(mapStateToProps, { login })(Login);
