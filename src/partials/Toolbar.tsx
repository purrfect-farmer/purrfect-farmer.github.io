import CheckList from "@/components/CheckList";
import ContainerGrid from "@/components/ContainerGrid";
import ToolbarImage from "@/assets/images/toolbar.png?format=webp";
import SectionHeading from "@/components/SectionHeading";

export default function Toolbar() {
  return (
    <ContainerGrid class="mx-auto p-10 gap-10">
      <div class="flex flex-col gap-2">
        {/* Heading */}
        <SectionHeading>Toolbar</SectionHeading>

        {/* Description */}
        <p>Auto-Clicker, fullscreen and more tools within the toolbar.</p>
        <p>
          The toolbar complements the farmer, it can be used for airdrops
          without a dedicated farmer.
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
      </div>

      {/* Image of Toolbar */}
      <div>
        <img
          src={ToolbarImage}
          class="ring-4 ring-orange-300 rounded-sm w-160"
        />
      </div>
    </ContainerGrid>
  );
}
