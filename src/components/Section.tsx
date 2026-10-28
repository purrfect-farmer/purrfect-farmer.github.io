import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

/** The padding around a section's content */
export const SECTION_PADDING = "px-4 py-10 sm:p-10";

/** The styles of a page-width section */
export const section = tv({
  base: "w-full max-w-5xl mx-auto",
  variants: {
    layout: {
      stack: "flex flex-col",
      grid: "grid grid-cols-1 lg:grid-cols-2",
    },
    spaced: {
      true: [SECTION_PADDING, "gap-10"],
    },
  },
  defaultVariants: {
    layout: "stack",
    spaced: true,
  },
});

interface SectionProps
  extends ComponentProps<"section">, VariantProps<typeof section> {}

/** A page-width section of the site */
export default function Section(props: SectionProps) {
  const [local, others] = splitProps(props, ["layout", "spaced", "class"]);

  return (
    <section
      {...others}
      class={section({
        layout: local.layout,
        spaced: local.spaced,
        class: local.class,
      })}
    />
  );
}
