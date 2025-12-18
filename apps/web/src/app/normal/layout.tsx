import { Navbar } from "@/components/navbar";
import { MobileBanner } from "@/components/mobile-banner";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <MobileBanner />
      {children}
      <Navbar />
    </>
  );
}
