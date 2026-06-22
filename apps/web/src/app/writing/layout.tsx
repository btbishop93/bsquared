import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl md:max-w-4xl mx-auto py-12 sm:py-24 px-6 pb-24">
      <ScrollToTop />
      {children}
      <Navbar />
    </div>
  );
}
