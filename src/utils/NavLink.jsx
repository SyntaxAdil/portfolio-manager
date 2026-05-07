"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, cn, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={` font-bold ${cn} ${isActive ? "text-emerald-300" : "text-gray-500 hover:text-emerald-500 duration-150"}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
