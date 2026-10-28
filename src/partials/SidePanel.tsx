import CheckList from "@/components/CheckList";
import FeatureSection from "@/components/FeatureSection";
import SidePanelImage from "@/assets/images/side-panel.png?format=webp&as=meta:src;width;height";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

export default function SidePanel() {
  return (
    <FeatureSection
      reversed
      media={
        <SiteImage
          image={SidePanelImage}
          alt="Purrfect Farmer in the browser side panel"
          framed
          class="w-160"
        />
      }
    >
      {/* Heading */}
      <SectionHeading>Side Panel</SectionHeading>

      {/* Description */}
      <p>
        Enable the farmer inside the side panel to farm while doing other tasks.
      </p>
      <p>No need to switch between windows—it works across all tabs.</p>

      {/* Features List */}
      <CheckList items={["Toggle Side Panel", "Configurable Window Mode"]} />
    </FeatureSection>
  );
}
