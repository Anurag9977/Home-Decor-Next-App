import SectionTitle from "@/components/global/SectionTitle";
import Sidebar from "@/components/sidebar/Sidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SectionTitle title="Dashboard" />
      <section className="mt-8 grid lg:grid-cols-[1fr_4fr] gap-x-12 xl:gap-x-20 gap-y-8">
        <aside className=" flex justify-between lg:flex-col lg:justify-start gap-2">
          <Sidebar />
        </aside>
        <div>{children}</div>
      </section>
    </main>
  );
}
export default AdminLayout;
