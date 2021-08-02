import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ Login, error }) {
    const [ details, setDetails ] = useState({ email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    };

    return (
        <form onSubmit={submitHandler} className="form">
            <h2>Login</h2>
            {error !== "" ? (
                <div className="form__error-login">{error}</div>
            ) : (
                ""
            )}
            <div className="form__group">
                <label className="form__group__label" htmlFor="form-email">
                    Email:
                </label>
                <input
                    className="form__group__input"
                    type="email"
                    name="email"
                    id="email"
                    onChange={e =>
                        setDetails({ ...details, email: e.target.value })}
                    value={details.email}
                />
            </div>
            <div className="form__group">
                <label className="form__group__label" htmlFor="password">
                    Password:
                </label>
                <input
                    className="form__group__input"
                    type="password"
                    name="password"
                    id="password"
                    onChange={e =>
                        setDetails({
                            ...details,
                            password : e.target.value,
                        })}
                    value={details.password}
                />
            </div>
            <input
                className="form__submit-button"
                type="submit"
                value="LOGIN"
            />
            <p>
                Don't have an account?
                <Link className="form__register-button" to="/register">
                    Register
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;
