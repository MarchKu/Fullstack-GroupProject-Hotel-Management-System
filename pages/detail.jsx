import React from "react";
import RoomDetail from "@/components/room-detail-component/main";
import OtherRoom from "@/components/room-detail-component/other";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import FooterComponent from "@/components/footer-component/FooterComponent";

function main() {
  return (
    <>
      <NavbarComponent/>
      <RoomDetail />
      <OtherRoom/>
      <FooterComponent/>
    </>
  );
}
export default main;
