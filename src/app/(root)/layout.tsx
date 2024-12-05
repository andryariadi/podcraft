import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-rose-500 flex">
      <LeftSidebar />

      <section className="bg-amber-500">
        <div className="bg-emerald-500">
          <p>Image</p>
          <p>Mobile Menu</p>
        </div>

        <div className="bg-sky-500">
          <p>Toaster</p>
          {children}
        </div>
      </section>

      <RightSidebar />
    </main>
  );
}
