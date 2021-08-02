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
                let tempErrors = {};

                for (let newError in errorMessage) {
                    if (newError === "non_field_errors") {
                        tempErrors["re_password"] = errorMessage[newError];
                    } else {
                        tempErrors[newError] = errorMessage[newError];
                    }
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
