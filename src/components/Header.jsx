"use client";
import React from "react";
import { headerLinks, authLinks } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  
  return (
    <div className="flex items-center justify-between px-10 py-2">
      <Link href="/" className="text-2xl font-semibold text-main_color">
        Website
      </Link>
      <div className="flex items-center justify-between gap-3 text-main_color">
        {headerLinks.map((link, index) => (
          <Link
            key={index}
            href={`/${link === "home" ? "" : link}`}
            className={`font-medium capitalize ${
              pathname === `/${link}`
                ? "border-b-2 border-b-main_color font-semibold"
                : "border-b-2 border-b-transparent "
            }`}
          >
            {link}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
      {!session ? (
            <>
        {authLinks.map((link, index) => (
          <Link
            key={index}
            href={`/${link}`}
            className={`font-medium capitalize px-2 py-1 flex items-center justify-center rounded-lg border-main_color border text-main_color hover:text-white hover:bg-main_color duration-150`}
          >
            {link}
          </Link>
        ))}
           </>
          ) : (
            <>
              {session?.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
      </div> 
    </div>
  );
};

export default Header;
