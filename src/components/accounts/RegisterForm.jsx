import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm({ Register, errors }) {
    const [ details, setDetails ] = useState({
        username    : "",
        email       : "",
        first_name  : "",
        last_name   : "",
        phone       : "",
        password    : "",
        re_password : "",
    });

    const submitHandler = e => {
        e.preventDefault();
        Register(details);
    };

    return (
        <form onSubmit={submitHandler} className="form">
            <h2>Register</h2>
            {/* {error !== '' ? <div className="error">{error}</div> : ''} */}
            <div className="form__group">
                <label className="form__group__label" htmlFor="username">
                    Username:
                </label>
                <input
                    className="form__group__input"
                    type="text"
                    name="username"
                    id="username"
                    onChange={e =>
                        setDetails({
                            ...details,
                            username : e.target.value,
                        })}
                    value={details.username}
                />
                {errors.username && (
                    <p className="form__error-register">{errors.username}</p>
                )}
            </div>
            <div className="form__group">
                <label className="form__group__label" htmlFor="email">
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
                {errors.email && (
                    <p className="form__error-register">{errors.email}</p>
                )}
            </div>
            <div className="form__group">
                <label className="form__group__label" htmlFor="first_name">
                    First Name:
                </label>
                <input
                    className="form__group__input"
                    type="text"
                    name="first_name"
                    id="first_name"
                    onChange={e =>
                        setDetails({
                            ...details,
                            first_name : e.target.value,
                        })}
                    value={details.first_name}
                />
                {errors.first_name && (
                    <p className="form__error-register">{errors.first_name}</p>
                )}
            </div>
            <div className="form__group">
                <label className="form__group__label" htmlFor="last_name">
                    Last Name:
                </label>
                <input
                    className="form__group__input"
                    type="text"
                    name="last_name"
                    id="last_name"
                    onChange={e =>
                        setDetails({
                            ...details,
                            last_name : e.target.value,
                        })}
                    value={details.last_name}
                />
                {errors.last_name && (
                    <p className="form__error-register">{errors.last_name}</p>
                )}
            </div>
            <div className="form__group">
                <label className="form__group__label" htmlFor="phone">
                    Phone number:
                </label>
                <input
                    className="form__group__input"
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={e =>
                        setDetails({ ...details, phone: e.target.value })}
                    value={details.phone}
                />
                {errors.phone && (
                    <p className="form__error-register">{errors.phone}</p>
                )}
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
                {errors.password && (
                    <p className="form__error-register">{errors.password}</p>
                )}
            </div>
            <div className="form__group">
                <label className="form__group__label" htmlFor="re_password">
                    Confirm Password:
                </label>
                <input
                    className="form__group__input"
                    type="password"
                    name="re_password"
                    id="re_password"
                    onChange={e =>
                        setDetails({
                            ...details,
                            re_password : e.target.value,
                        })}
                    value={details.re_password}
                />
                {errors.re_password && (
                    <p className="form__error-register">{errors.re_password}</p>
                )}
            </div>
            <input
                type="submit"
                value="REGISTER"
                className="form__submit-button"
            />
            <p>
                Already have an account?
                <Link className="form__register-button" to="/login">
                    Login
                </Link>
            </p>
        </form>
    );
}

export default RegisterForm;
