import Hero from "@/components/homepage-component/hero";
import About from "@/components/homepage-component/about";
import Service from "@/components/homepage-component/service";
import RoomSuite from "@/components/homepage-component/room&suite";
import Testimonial from "@/components/homepage-component/testimonial";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <Hero />
      <About />
      <Service />
      <RoomSuite />
      <Testimonial />
    </>
  );
}
