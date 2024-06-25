import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div>
      <Header />
      <main className="px-5 flex justify-center py-12">{children}</main>
      <Footer />
    </div>
  );
}
