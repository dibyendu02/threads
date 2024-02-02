"use client"

import React from "react";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-col px-4 ">
        {sidebarLinks.map((item) => {
          const pathname = usePathname();
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          
        return (
          <Link href={item.route} key={item.label} 
          className={`leftsidebar_link ${ isActive && `bg-primary-500`}`}
          >
            <Image src={item.imgURL} alt={item.label} height={24} width={24} />

            <p className="text-light-1 max-lg:hidden">{item.label}</p>
          </Link>
        )}
        )}

        <div className="mt-40 px-4  ">
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex gap-4 cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                height={20}
                width={20}
              />
              <p className="text-light-2 max-lg:hidden ">Logout</p>
            </div>
          </SignOutButton>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
