import NavbarComponent from "./navigation-component/NavbarComponent";

export default function Layout({ children }) {
  return (
    <>
      <NavbarComponent />
      {children}
    </>
  );
}
