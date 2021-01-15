import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="container">
            <h1>Brass</h1>
            <ul className="" id="menu">
                <li>
                    <NavLink to="funds-transfer">Funds Transfer</NavLink>
                </li>
                <li>
                    <NavLink to="/transfer-history">
                        Transaction History
                    </NavLink>{" "}
                </li>
            </ul>
        </div>
    );
};

export default Header;
