import CheckList from "@/components/CheckList";
import ContainerGrid from "@/components/ContainerGrid";
import FarmersImage from "@/assets/images/farmers.png?format=webp";
import SectionHeading from "@/components/SectionHeading";

export default function Farmers() {
  return (
    <ContainerGrid class="mx-auto p-10 gap-10">
      <div class="flex flex-col gap-2 lg:col-start-2">
        {/* Heading */}
        <SectionHeading>Farmers</SectionHeading>

        {/* Description */}
        <p>
          20+ dedicated Farmers included, with support for running multiple
          farmers at once.
        </p>

        <p>
          Ability to choose between session or web mode for farming, configure
          everything down to the last setting.
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
      </div>

      {/* Image of Farmers */}
      <div class="lg:row-start-1 lg:col-start-1">
        <img src={FarmersImage} class="w-160" />
      </div>
    </ContainerGrid>
  );
}
