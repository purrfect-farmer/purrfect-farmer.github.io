import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

/** The styles of a card and its title */
export const card = tv({
  slots: {
    base: ["flex flex-col min-w-0", "p-4 rounded-xl", "bg-orange-200/40"],
    title: "font-bold text-lg text-orange-800",
  },
  variants: {
    highlighted: {
      true: { base: "ring-2 ring-orange-500" },
    },
  },
});

/** The card slot styles */
const styles = card();

interface CardProps extends ComponentProps<"div">, VariantProps<typeof card> {}

/** A tinted box grouping related content */
export default function Card(props: CardProps) {
  const [local, others] = splitProps(props, ["highlighted", "class"]);

  return (
    <div
      {...others}
      class={styles.base({
        highlighted: local.highlighted,
        class: local.class,
      })}
    />
  );
}

/** The title of a card */
export function CardTitle(props: ComponentProps<"h4">) {
  const [local, others] = splitProps(props, ["class"]);

  return <h4 {...others} class={styles.title({ class: local.class })} />;
}
