import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ isAuthenticated, logout }) => {
    return (
        <div className="nav">
            <div className="nav__wrapper">
                <Link className="nav__link" to="/">
                    Home
                </Link>
                <div>
                    {!isAuthenticated ? (
                        <Link className="nav__link" to="/login">
                            Login
                        </Link>
                    ) : (
                        <button className="nav__link" onClick={logout}>
                            Logout
                        </button>
                    )}

                    <Link className="nav__link" to="/favourites">
                        Favourites
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
