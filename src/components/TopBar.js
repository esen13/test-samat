import React from "react";
import {Link, NavLink} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";


export const TopBar = () => {
    const [token] = useLocalStorage('tokenId');

    return(
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Transaction app</Link>
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact>Главная</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">Создать транзакцию</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Авторизация</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
};