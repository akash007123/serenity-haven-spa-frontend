import { ReactNode } from "react";
import PreHeader from "./layout/PreHeader";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

/* ─── Layout ─── */
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <PreHeader />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
