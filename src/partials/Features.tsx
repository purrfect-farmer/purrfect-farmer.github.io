import { SECTION_PADDING } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionIntro from "@/components/SectionIntro";

export default function Features() {
  return (
    <SectionIntro class={SECTION_PADDING}>
      {/* Heading */}
      <SectionHeading>Features</SectionHeading>

      {/* Description */}
      <p>
        Purrfect Farmer is an advanced Telegram Mini-Apps automation tool. It's
        packed with numerous features that make farming airdrops easy.
      </p>
    </SectionIntro>
  );
}
