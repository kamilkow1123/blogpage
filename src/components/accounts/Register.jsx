import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

const Register = ({ errorMessage, isAuthenticated, register }) => {
    const [ errors, setErrors ] = useState({});

    useEffect(
        () => {
            if (errorMessage !== "") {
                console.log(errorMessage);
                let tempErrors = {};

                for (let newError in errorMessage) {
                    console.log(errorMessage[newError]);
                    if (newError === "re_password")
                        tempErrors[newError] = `Password is required`;
                    else
                        tempErrors[newError] = `${newError[0].toUpperCase() +
                            newError.slice(1)} is required`;
                }
                setErrors(tempErrors);
            }
        },
        [ errorMessage ]
    );

    const Register = details => {
        register(details);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div className="login">
                    <Link to="/" className="login__back-button">
                        <span>
                            <FaArrowLeft />
                        </span>{" "}
                        back
                    </Link>
                    <RegisterForm Register={Register} errors={errors} />
                </div>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated,
        errorMessage    : state.auth.error,
    };
};

export default connect(mapStateToProps, { register })(Register);
