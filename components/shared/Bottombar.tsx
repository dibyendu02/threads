"use client"

import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
      {sidebarLinks.map((item) => {
          const pathname = usePathname();
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          
        return (
          <Link href={item.route} key={item.label} 
          className={`bottombar_link ${ isActive && `bg-primary-500`}`}
          >
            <Image src={item.imgURL} alt={item.label} height={24} width={24} />

            <p className="text-subtle-medium text-light-1 max-sm:hidden ">{item.label.split(/\s+/)[0]}</p>
          </Link>
        )}
        )}
      </div>
    </section>
  );
};

export default Bottombar;
