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
        Purrfect Farmer is an advanced Telegram Mini-Apps automation tool. It's
        packed with numerous features that make farming airdrops easy.
      </p>
    </div>
  );
}
