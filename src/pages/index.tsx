import { Inter } from "next/font/google";
import LandingPage from "@/components/LandingPage/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <LandingPage />;
}
