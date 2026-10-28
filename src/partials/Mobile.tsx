import CheckList from "@/components/CheckList";
import FeatureSection from "@/components/FeatureSection";
import MobileImage from "@/assets/images/mobile.png?format=webp&as=meta:src;width;height";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

export default function Mobile() {
  return (
    <FeatureSection
      reversed
      contentClass="justify-center"
      media={<SiteImage image={MobileImage} alt="Purrfect Farmer on a phone" />}
    >
      {/* Heading */}
      <SectionHeading>Mobile</SectionHeading>

      {/* Description */}
      <p>
        Purrfect Farmer can also be installed on mobile browsers with Chrome
        extension support.
      </p>

      <p>
        The extension has always been developed with a mobile-first approach.
      </p>

      <p>
        It can run on even the most basic devices, allowing you to farm on the
        go.
      </p>

      {/* Features List */}
      <CheckList items={["Kiwi Browser", "Mises Browser"]} />
    </FeatureSection>
  );
}
