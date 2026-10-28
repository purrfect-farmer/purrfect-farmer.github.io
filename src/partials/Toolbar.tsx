import CheckList from "@/components/CheckList";
import FeatureSection from "@/components/FeatureSection";
import ToolbarImage from "@/assets/images/toolbar.png?format=webp&as=meta:src;width;height";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

export default function Toolbar() {
  return (
    <FeatureSection
      media={
        <SiteImage
          image={ToolbarImage}
          alt="The Purrfect Farmer toolbar"
          framed
          class="w-160"
        />
      }
    >
      {/* Heading */}
      <SectionHeading>Toolbar</SectionHeading>

      {/* Description */}
      <p>Auto-Clicker, fullscreen, and more tools within the toolbar.</p>
      <p>
        The toolbar complements the farmer and can be used for airdrops without
        a dedicated farmer.
      </p>

      {/* Features List */}
      <CheckList
        items={[
          "Auto Clicker",
          "Fullscreen",
          "Open in Separate Tab",
          "Copy URL",
          "Toggle Toolbar",
        ]}
      />
    </FeatureSection>
  );
}
