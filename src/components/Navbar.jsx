import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="nav">
            <div className="nav__wrapper">
                <Link className="nav__link" to="/">
                    Home
                </Link>
                <Link className="nav__link" to="/favourites">
                    Favourites
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
