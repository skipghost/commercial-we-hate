import PageHero from "@/components/page-hero";

import AboutUs from "./AboutUs";
import HowToParticipate from "./HowToParticipate";
import WhyChooseUs from "./WhyChooseUs";

const AboutUsPage = () => {
  return (
    <>
      <PageHero
        title="About Us"
        pageName="About Us"
      />

      <AboutUs />

      <WhyChooseUs />

      <HowToParticipate />
    </>
  );
};

export default AboutUsPage;

