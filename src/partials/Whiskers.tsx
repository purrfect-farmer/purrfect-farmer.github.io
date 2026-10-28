import WhiskersImage from "@/assets/images/whiskers.png?format=webp&as=meta:src;width;height";
import LinkButton from "@/components/LinkButton";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionIntro from "@/components/SectionIntro";
import SiteImage from "@/components/SiteImage";
import { HiOutlineArrowDownCircle } from "solid-icons/hi";
import { IS_WHISKERS } from "@/lib/client";
import { Anchor, hrefOf } from "@/lib/anchors";
import { Show } from "solid-js";

export default function Whiskers() {
  return (
    <Section>
      <SectionIntro>
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
        <Show when={!IS_WHISKERS}>
          <LinkButton
            icon={HiOutlineArrowDownCircle}
            href={hrefOf(Anchor.DOWNLOAD_WHISKERS)}
          >
            Download Whiskers
          </LinkButton>
        </Show>
      </SectionIntro>

      {/* Image of Whiskers */}
      <div class="px-2">
        <SiteImage
          image={WhiskersImage}
          alt="Purrfect Whiskers running many accounts side by side"
          framed
        />
      </div>
    </Section>
  );
}
