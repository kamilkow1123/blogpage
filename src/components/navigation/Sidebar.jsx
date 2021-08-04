import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Sidebar = ({ toggle, isOpen, logout, auth }) => {
    return (
        <aside
            className="sidebar"
            onClick={toggle}
            style={{ transform: `${isOpen ? "translateY(0)" : ""}` }}
        >
            <div className="sidebar__close-icon" onClick={toggle}>
                <FaTimes />
            </div>
            <ul className="sidebar__wrapper">
                <Link to="/new" className="sidebar__link" onClick={toggle}>
                    Add post
                </Link>
                <Link
                    to={auth.user ? `/${auth.user.username}` : "/"}
                    className="sidebar__link"
                    onClick={toggle}
                >
                    Your profile
                </Link>
                <div className="sidebar__link" onClick={logout}>
                    Logout
                </div>
            </ul>
        </aside>
    );
};

const mapStateToProps = state => {
    return {
        auth : state.auth,
    };
};

export default connect(mapStateToProps, { logout })(Sidebar);
