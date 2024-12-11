import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth.slice.js";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <nav className="h-[75px] w-full px-10 sticky top-0 bg-slate-400 flex justify-between items-center">
        <ul className="flex gap-3">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => `${isActive ? "active-link" : ""} `}
            >
              Acceuil
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"profile"}
              className={({ isActive }) => `${isActive ? "active-link" : ""} `}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"dashboard"}
              className={({ isActive }) => `${isActive ? "active-link" : ""} `}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
        {!isAuthenticated && (
          <ul className="flex gap-3">
            <li>
              <NavLink to={"register"}>Inscription</NavLink>
            </li>
            <li>
              <NavLink to={"login"}>Connexion</NavLink>
            </li>
          </ul>
        )}
        {isAuthenticated && (
          <ul className="flex gap-3">
            <li className="font-bold cursor-pointer" onClick={handleLogout}>
              Deconnexion
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
