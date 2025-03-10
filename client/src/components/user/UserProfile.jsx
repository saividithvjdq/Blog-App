import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div>
      <div className="auth">
        <ul className="flex justify-around list-none font-light">
          <li className="nav-item bg-cyan-700 p-72">
            <NavLink to="articles" className="nav-link">
              Articles
            </NavLink>
          </li>
        </ul>
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
