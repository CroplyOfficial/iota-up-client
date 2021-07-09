import { Container } from "../../components/container/container";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { AboutUsHero } from "./hero.about_us";
import { DonateHero } from "../../components/donateHero/donateHero";

export const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <AboutUsHero />
      </Container>
      <DonateHero />
      <Footer />
    </div>
  );
};
