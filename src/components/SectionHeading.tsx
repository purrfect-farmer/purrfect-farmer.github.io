import { splitProps, type ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends ComponentProps<"h2"> {
  as?: "h1" | "h2";
}

/** The heading of a section, an h2 unless `as` says otherwise */
export default function SectionHeading(props: SectionHeadingProps) {
  const [local, others] = splitProps(props, ["as", "class"]);

  return (
    <Dynamic
      component={local.as ?? "h2"}
      {...others}
      class={cn(
        "font-turret-road text-3xl lg:text-4xl text-orange-500",
        local.class,
      )}
    />
  );
}
