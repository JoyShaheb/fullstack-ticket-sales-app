import React, { useEffect } from "react";
import {
  Bars3Icon,
  ChartPieIcon,
  LockClosedIcon,
  BookmarkIcon,
  ReceiptPercentIcon,
  UserIcon,
  MoonIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import BasicSwitch from "../Switch/BasicSwitch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { themeSwitch, ThemeTypesEnum } from "../../store/Slices/systemSlice";
import { gradientTextStyles } from "../Text/TextStyles";
import { logoutSuccess } from "../../store/Slices/userSlice";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const mode: string = useSelector((x: RootState) => x.system.mode);
  const token: string = useSelector((x: RootState) => x.user.token);
  const iconStyles =
    "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";

  useEffect(() => {
    document.documentElement.classList.toggle(
      ThemeTypesEnum.DARK,
      mode === ThemeTypesEnum.DARK
    );
  }, [mode]);
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <Bars3Icon className="w-6" strokeWidth={2} />
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div
            className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}
          >
            Ticket Sales
          </div>
          <ul className="space-y-2 font-medium">
            {token && (
              <NavLink
                to="/"
                label="Dashboard"
                icon={<ChartPieIcon className={iconStyles} />}
              />
            )}
            <NavLink
              to="/events"
              label="Events"
              icon={<CalendarDaysIcon className={iconStyles} />}
            />
            {token && (
              <>
                <NavLink
                  to="/bookmark"
                  label="Bookmark"
                  icon={<BookmarkIcon className={iconStyles} />}
                />
                <NavLink
                  to="/purchase-history"
                  label="Purchase History"
                  icon={<ReceiptPercentIcon className={iconStyles} />}
                />
                <NavLink
                  to="/profile"
                  label="Profile"
                  icon={<UserCircleIcon className={iconStyles} />}
                />
              </>
            )}

            {token && (
              <NavLink
                to="/login"
                label="Signout"
                icon={<ArrowRightOnRectangleIcon className={iconStyles} />}
                onClick={() => {
                  dispatch(logoutSuccess());
                }}
              />
            )}

            {!token && (
              <>
                <NavLink
                  to="/login"
                  label="Login"
                  icon={<LockClosedIcon className={iconStyles} />}
                />
                <NavLink
                  to="/signup"
                  label="Signup"
                  icon={<UserIcon className={iconStyles} />}
                />
              </>
            )}

            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  group">
              <MoonIcon className={iconStyles} />
              <span className="flex-1 ml-3 whitespace-nowrap">Dark Mode</span>
              <BasicSwitch
                checked={mode === ThemeTypesEnum.DARK}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e.target.checked
                    ? dispatch(themeSwitch(ThemeTypesEnum.DARK))
                    : dispatch(themeSwitch(ThemeTypesEnum.LIGHT))
                }
              />
            </div>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">{children}</div>
    </>
  );
};

export default Sidebar;
