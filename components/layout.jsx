import NavbarComponent from "./navigation-component/NavbarComponent";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  console.log("pathname", pathname);
  const isAdminPath = pathname.startsWith("/admin");
  console.log("isAdminPath", isAdminPath);

  return (
    <>
      {!isAdminPath && <NavbarComponent />}
      {children}
    </>
  );
}
