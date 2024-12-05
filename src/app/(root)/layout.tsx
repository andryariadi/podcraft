import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-rose-500 flex">
      <LeftSidebar />

      <section className="bg-amber-500 flex-1 min-h-screen flex flex-col px-4 sm:px-14">
        <div className="bg-violet-600 max-w-5xl w-full mx-auto flex-col max-sm:px-4">
          <div className="bg-lime-600 h-16 flex items-center justify-between mdhidden">
            <Image src={"/icons/logo.svg"} alt="logo" width={30} height={30} />
            <MobileNav />
          </div>

          <div className="bg-sky-500 flex flex-col md:pb-14">
            <p>Toaster</p>
            {children}
          </div>
        </div>
      </section>

      <RightSidebar />
    </main>
  );
}
