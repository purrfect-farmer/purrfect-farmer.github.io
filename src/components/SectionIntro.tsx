import { cn } from "@/lib/utils";
import type { ComponentProps } from "solid-js";

/** A centred heading and text introducing a section */
export default function SectionIntro(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      class={cn(
        "max-w-3xl mx-auto",
        "flex flex-col justify-center items-center gap-4",
        "text-center",
        props.class,
      )}
    />
  );
}
