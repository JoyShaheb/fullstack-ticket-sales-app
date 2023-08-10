import React, { FC } from "react";
import { Link } from "react-router-dom";

interface INavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: FC<INavLinkProps> = ({ icon, label, to }) => {
  return (
    <Link
      to={to}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {icon}
      <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
    </Link>
  );
};

export default NavLink;
