import CheckList from "@/components/CheckList";
import CloudImage from "@/assets/images/cloud.png?format=webp&as=meta:src;width;height";
import FeatureSection from "@/components/FeatureSection";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

export default function Cloud() {
  return (
    <FeatureSection
      media={
        <SiteImage image={CloudImage} alt="Purrfect Cloud" class="w-160" />
      }
    >
      {/* Heading */}
      <SectionHeading>Cloud</SectionHeading>

      {/* Description */}
      <p>
        Automated cloud farming for Mini-Apps—sync once and let the cloud handle
        the rest.
      </p>

      <p>
        Purrfect Cloud requires a monthly subscription when using the official
        servers.
      </p>

      <p>
        Every cloud user gets full access to all available cloud farmers, a
        dedicated proxy IP, and cloud sessions to persist farming.
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
    </FeatureSection>
  );
}
