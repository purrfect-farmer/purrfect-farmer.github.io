import CheckList from "@/components/CheckList";
import CloudImage from "@/assets/images/cloud.png?format=webp";
import ContainerGrid from "@/components/ContainerGrid";
import SectionHeading from "@/components/SectionHeading";

export default function Cloud() {
  return (
    <ContainerGrid class="mx-auto p-10 gap-10">
      <div class="flex flex-col gap-2">
        {/* Heading */}
        <SectionHeading>Cloud</SectionHeading>

        {/* Description */}
        <p>
          Automated Cloud Farming for Mini-Apps, sync once and let the Cloud
          handle the rest.
        </p>

        <p>
          Purrfect Cloud requires a monthly subscription when using the Official
          Servers.
        </p>

        <p>
          Every Cloud User gets full access to all available Cloud Farmers,
          dedicated Proxy IP and Cloud Sessions to persist farming.
        </p>

        {/* Features List */}
        <CheckList
          items={[
            "Periodic Tasks",
            "Instant Notifications",
            "Accumulate more points",
            "Proxies",
            "24/7 Uptime",
          ]}
        />
      </div>

      {/* Image of Cloud */}
      <div>
        <img src={CloudImage} class="w-160" />
      </div>
    </ContainerGrid>
  );
}
