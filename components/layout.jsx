import NavbarComponent from "./navigation-component/NavbarComponent";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <NavbarComponent />}
      {children}
    </>
  );
}
