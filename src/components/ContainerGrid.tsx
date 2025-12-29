import { cn } from "@/lib/utils";
import type { ComponentProps } from "solid-js";

export default function ContainerGrid(props: ComponentProps<"section">) {
  return (
    <section
      {...props}
      class={cn(
        "w-full mx-auto grid grid-cols-1 lg:grid-cols-2 max-w-5xl",
        props.class
      )}
    />
  );
}
