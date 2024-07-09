import Hero from "@/components/homepage-component/hero";
import About from "@/components/homepage-component/about";
import Service from "@/components/homepage-component/service";
import RoomSuite from "@/components/homepage-component/room&suite";
import Testimonial from "@/components/homepage-component/testimonial";
import FooterComponent from "@/components/footer-component/FooterComponent";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Service/>
      <RoomSuite/>
      <Testimonial />
      <FooterComponent />
    </>
  );
}
