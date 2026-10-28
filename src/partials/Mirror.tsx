import CheckList from "@/components/CheckList";
import FeatureSection from "@/components/FeatureSection";
import LinkButton from "@/components/LinkButton";
import MirrorImage from "@/assets/images/mirror.png?format=webp&as=meta:src;width;height";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";
import { HiOutlineArrowDownCircle } from "solid-icons/hi";

export default function Mirror() {
  return (
    <FeatureSection
      media={
        <SiteImage
          image={MirrorImage}
          alt="Purrfect Mirror Server"
          framed
          class="w-160"
        />
      }
    >
      {/* Heading */}
      <SectionHeading>Mirror</SectionHeading>

      {/* Description */}
      <p>
        Sync commands across multiple accounts, events are dispatched
        seamlessly.
      </p>

      <p>
        Purrfect Mirror Server needs to be installed to use Mirror. This is a
        separate application for Linux / MacOS / Windows.
      </p>

      <p>
        Mirror allows you to, for example, synchronize settings, start or stop
        farming, and more across multiple accounts.
      </p>

      {/* Features List */}
      <CheckList
        items={[
          "Toggle Mirroring",
          "Configurable Server",
          "Farmers Per Window",
          "Individual Farmer Position",
        ]}
      />

      {/* Download Button */}
      <div>
        <LinkButton
          icon={HiOutlineArrowDownCircle}
          href={import.meta.env.VITE_APP_MIRROR_GITHUB_RELEASE}
        >
          Get Mirror Server
        </LinkButton>
      </div>
    </FeatureSection>
  );
}
