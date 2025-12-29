import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

export default function Features() {
  return (
    <div
      class={cn(
        "max-w-3xl mx-auto",
        "flex flex-col justify-center items-center gap-4 p-10",
        "text-center"
      )}
    >
      {/* Heading */}
      <SectionHeading>Features</SectionHeading>

      {/* Description */}
      <p>
        Purrfect Farmer is an advance Telegram Mini-Apps automation tool, it's
        packed with numerous features that makes farming airdrops easy.
      </p>
    </div>
  );
}
