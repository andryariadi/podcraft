"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  console.log({ pathname, router }, "<---disidebar");

  return (
    <section className="bg-amber-500 left_sidebar">
      <nav className="bg-emerald-500 flex flex-col">
        <Link href="/" className="bg-violet-600 flex items-center gap-2 pb-10 max-lg:justify-center">
          <Image src={"/icons/logo.svg"} alt="logo" width={32} height={32} />
          <h1 className="text-24 font-extrabold max-lg:hidden">PodCraft</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("flex items-center gap-3 py-5 max-lg:px-4 justify-center lg:justify-start", {
                "bg-nav-focus border-r-4 border-orange-1": isActive,
              })}
            >
              <Image src={item.imgURL} alt={item.label} width={24} height={24} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default LeftSidebar;
