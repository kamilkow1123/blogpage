import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { FaBars } from "react-icons/fa";

const Navbar = ({ auth, logout, toggle }) => {
    return (
        <nav className="nav">
            <div className="nav__wrapper">
                <Link className="nav__link" to="/">
                    Home
                </Link>

                {!auth.isAuthenticated ? (
                    <Link className="nav__link nav__link--login" to="/login">
                        Login
                    </Link>
                ) : (
                    <ul className="nav__menu">
                        {auth.user && (
                            <React.Fragment>
                                <li>
                                    <Link className="nav__link" to="/new">
                                        Add post
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="nav__link"
                                        to={`/user/${auth.user.username}`}
                                    >
                                        Your profile
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                        <li>
                            <button
                                className="nav__link--logout"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
                {auth.isAuthenticated && (
                    <div className="nav__mobile-icon" onClick={toggle}>
                        <FaBars />
                    </div>
                )}
            </div>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        auth : state.auth,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
