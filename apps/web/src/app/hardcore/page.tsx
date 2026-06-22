import { redirect } from "next/navigation";

export const metadata = {
  title: "Hardcore Mode | Brenden Bishop",
  description: "Terminal interface for exploring Brenden's portfolio",
};

export default function HardcorePage() {
  redirect("/home");
}
