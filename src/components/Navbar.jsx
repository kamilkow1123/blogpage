import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ auth, logout }) => {
    return (
        <div className="nav">
            <div className="nav__wrapper">
                <Link className="nav__link" to="/">
                    Home
                </Link>
                <div className="nav__links">
                    {!auth.isAuthenticated ? (
                        <Link className="nav__link" to="/login">
                            Login
                        </Link>
                    ) : (
                        <div className="nav__user">
                            {auth.user && (
                                <Link
                                    className="nav__link"
                                    to={`/${auth.user.username}`}
                                >
                                    Your profile
                                </Link>
                            )}
                            <button
                                className="nav__link--logout"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth : state.auth,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
