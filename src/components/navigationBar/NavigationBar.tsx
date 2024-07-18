import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_POST_CREATE,
} from "../../constants/WebPath";
import {
  RedditIcon,
  RedditText,
  UserProfileFilledIcon,
  UserProfileIcon,
} from "../icons";
import CreateButton from "../ui/button/CreateButton";
import { useAuth } from "../../context/AuthProvider";

const NavigationBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const bLoggin = auth?.isLoggedIn();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav>
        <div className="wrapper flex items-center justify-between p-4 mx-auto gap-3 border-b">
          <NavLink to={ROUTE_HOME} className="flex items-center gap-2">
            <RedditIcon width="40px" height="40px" />
            <RedditText height="25px" />
          </NavLink>
          <div className="w-full bg-slate-200"></div>
          <div className="flex items-center justify-end gap-3">
            {bLoggin ? (
              <NavLink to={ROUTE_POST_CREATE}>
                <CreateButton />
              </NavLink>
            ) : (
              <NavLink to={ROUTE_LOGIN}>
                <CreateButton />
              </NavLink>
            )}

            <div
              className="flex items-center hover:bg-slate-200 p-2 rounded-lg relative"
              ref={dropdownRef}
            >
              <button onClick={toggleDropdown}>
                {bLoggin ? (
                  <UserProfileFilledIcon className="size-5" />
                ) : (
                  <UserProfileIcon className="size-5" />
                )}
              </button>
              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <div className="dropdown-content absolute right-2 top-[35px] mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  {bLoggin ? (
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => {
                        auth?.authLogout();
                        toast.success("Logged out successfully");
                        navigate(ROUTE_HOME);
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to={ROUTE_LOGIN}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
