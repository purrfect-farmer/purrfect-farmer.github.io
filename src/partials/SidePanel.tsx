import CheckList from "@/components/CheckList";
import ContainerGrid from "@/components/ContainerGrid";
import SidePanelImage from "@/assets/images/side-panel.png?format=webp";
import SectionHeading from "@/components/SectionHeading";

export default function SidePanel() {
  return (
    <ContainerGrid class="mx-auto p-10 gap-10">
      <div class="flex flex-col gap-2 lg:col-start-2">
        {/* Heading */}
        <SectionHeading>Side Panel</SectionHeading>

        {/* Description */}
        <p>
          Enable the farmer inside the side panel to farm while doing other
          tasks.
        </p>
        <p>No need to switch between windows—it works across all tabs.</p>

        {/* Features List */}
        <CheckList items={["Toggle Side Panel", "Configurable Window Mode"]} />
      </div>

      {/* Image of Side Panel */}
      <div class="lg:row-start-1 lg:col-start-1">
        <img
          src={SidePanelImage}
          class="ring-4 ring-orange-300 rounded-sm w-160"
        />
      </div>
    </ContainerGrid>
  );
}
