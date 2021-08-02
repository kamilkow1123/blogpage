import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="nav">
            <div className="nav__wrapper">
                <Link className="nav__link" to="/">
                    Home
                </Link>
                <div>
                    <Link className="nav__link" to="/login">
                        Login
                    </Link>
                    <Link className="nav__link" to="/favourites">
                        Favourites
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
