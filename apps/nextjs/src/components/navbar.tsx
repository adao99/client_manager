import type { FC } from "react";

import type { Session } from "@acme/auth";

import { SignOut } from "./auth";

export interface NavBarProps {
  session: Session;
}

export const NavBar: FC<NavBarProps> = (props) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">Client Managment</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  props.session.user.image ??
                  "https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <SignOut></SignOut>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
