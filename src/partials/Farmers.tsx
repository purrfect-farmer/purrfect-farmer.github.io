import CheckList from "@/components/CheckList";
import FarmersImage from "@/assets/images/farmers.png?format=webp&as=meta:src;width;height";
import FeatureSection from "@/components/FeatureSection";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

export default function Farmers() {
  return (
    <FeatureSection
      reversed
      media={
        <SiteImage
          image={FarmersImage}
          alt="The farmers list in Purrfect Farmer"
          class="w-160"
        />
      }
    >
      {/* Heading */}
      <SectionHeading>Farmers</SectionHeading>

      {/* Description */}
      <p>
        20+ dedicated Farmers included, with support for running multiple
        farmers at once.
      </p>

      <p>
        Choose between session or web mode for farming, and configure everything
        down to the last setting.
      </p>

      {/* Features List */}
      <CheckList
        items={[
          "Multiple Tabs",
          "Zoomies (Auto Farming)",
          "Enable / Disable Farmers",
          "Reorder Farmers",
          "Farmer Mode",
          "Telegram Web Version",
        ]}
      />
    </FeatureSection>
  );
}
