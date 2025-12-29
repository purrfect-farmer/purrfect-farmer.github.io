import CheckList from "@/components/CheckList";
import ContainerGrid from "@/components/ContainerGrid";
import LinkButton from "@/components/LinkButton";
import MirrorImage from "@/assets/images/mirror.png?format=webp";
import SectionHeading from "@/components/SectionHeading";
import { HiOutlineArrowDownCircle } from "solid-icons/hi";

export default function Mirror() {
  return (
    <ContainerGrid class="mx-auto p-10 gap-10">
      <div class="flex flex-col gap-2">
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
          Mirror allows you to e.g synchronize settings, start or stop farming
          and more among multiple accounts.
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
      </div>

      {/* Image of Mirror */}
      <div>
        <img
          src={MirrorImage}
          class="ring-4 ring-orange-300 rounded-sm w-160"
        />
      </div>
    </ContainerGrid>
  );
}
