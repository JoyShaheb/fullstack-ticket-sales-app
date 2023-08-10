import {
  Bars3Icon,
  ChartPieIcon,
  LockClosedIcon,
  BookmarkIcon,
  ReceiptPercentIcon,
  UserIcon,
  MoonIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import BasicSwitch from "../Switch/BasicSwitch";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const iconStyles =
    "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
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
          <ul className="space-y-2 font-medium">
            <NavLink
              to="/"
              label="Dashboard"
              icon={<ChartPieIcon className={iconStyles} />}
            />
            <NavLink
              to="/events"
              label="Events"
              icon={<CalendarDaysIcon className={iconStyles} />}
            />

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
              to="/login"
              label="Login"
              icon={<LockClosedIcon className={iconStyles} />}
            />

            <NavLink
              to="/signup"
              label="Signup"
              icon={<UserIcon className={iconStyles} />}
            />
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  group">
              <MoonIcon className={iconStyles} />
              <span className="flex-1 ml-3 whitespace-nowrap">Dark Mode</span>
              <BasicSwitch />
            </div>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">{children}</div>
    </>
  );
};

export default Sidebar;
