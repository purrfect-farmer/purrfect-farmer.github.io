import { cn } from "@/lib/utils";
import WhiskersImage from "@/assets/images/whiskers.png?format=webp";
import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";
import { HiOutlineArrowDownCircle } from "solid-icons/hi";

export default function Whiskers() {
  return (
    <section class="p-10 flex flex-col gap-10">
      <div
        class={cn(
          "max-w-3xl mx-auto",
          "flex flex-col justify-center items-center gap-4",
          "text-center"
        )}
      >
        {/* Heading */}
        <SectionHeading>Whiskers</SectionHeading>

        {/* Description */}
        <p>
          Purrfect Whiskers is a desktop application designed to efficiently
          manage multiple instances of the Chrome extension. Launch several
          instances side by side, organize them in rows or columns, and
          streamline your automation workflow.
        </p>

        {/* Link to download Whiskers */}
        <LinkButton
          icon={HiOutlineArrowDownCircle}
          href={import.meta.env.VITE_APP_WHISKERS_GITHUB_RELEASE}
        >
          Get Whiskers
        </LinkButton>
      </div>

      {/* Image of Whiskers */}
      <div class="max-w-5xl mx-auto">
        <img src={WhiskersImage} class="ring-4 ring-orange-300 rounded-sm" />
      </div>
    </section>
  );
}
