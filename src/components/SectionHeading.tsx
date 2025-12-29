import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "@/lib/utils";

export default function SectionHeading(props: ComponentProps<"h2">) {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <h2
      {...others}
      class={cn(
        "font-turret-road text-3xl lg:text-4xl text-orange-500",
        local.class
      )}
    />
  );
}
