import {
  Show,
  children,
  splitProps,
  type Component,
  type ComponentProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv, type VariantProps } from "tailwind-variants";
import { isDirectDownload } from "@/lib/releases";

/** The styles of a pill-shaped link */
export const linkButton = tv({
  slots: {
    base: [
      "inline-flex items-center justify-center gap-2 min-w-0",
      "rounded-full font-bold text-center",
    ],
    icon: "size-5 shrink-0",
    label: "min-w-0",
  },
  variants: {
    intent: {
      primary: { base: "bg-orange-500 text-white" },
      secondary: { base: "bg-orange-300/50 text-orange-800" },
      soft: { base: "bg-orange-200 text-orange-800", icon: "text-orange-500" },
      dark: { base: "bg-neutral-800", icon: "text-orange-500" },
    },
    size: {
      sm: { base: "px-3 py-1 text-sm" },
      md: { base: "px-4 py-2.5" },
      lg: { base: "px-6 py-3 text-lg", icon: "size-6" },
      icon: { base: "p-3", icon: "size-4" },
    },
  },
  defaultVariants: {
    intent: "soft",
    size: "md",
  },
});

/** The target of a link: the same tab for page anchors and file downloads */
const targetOf = (href = "") =>
  href.startsWith("#") || isDirectDownload(href) ? undefined : "_blank";

interface LinkButtonProps
  extends ComponentProps<"a">, VariantProps<typeof linkButton> {
  icon?: Component<{ class: string }>;
}

/** A pill-shaped link with an optional icon */
const LinkButton = (props: LinkButtonProps) => {
  const [local, others] = splitProps(props, [
    "icon",
    "intent",
    "size",
    "children",
    "class",
  ]);

  /** The resolved label */
  const label = children(() => local.children);

  /** The slot styles for the intent and size */
  const styles = () => linkButton({ intent: local.intent, size: local.size });

  return (
    <a
      target={targetOf(others.href)}
      {...others}
      class={styles().base({ class: local.class })}
    >
      <Show when={local.icon}>
        {(icon) => <Dynamic component={icon()} class={styles().icon()} />}
      </Show>
      <Show when={label()}>
        <span class={styles().label()}>{label()}</span>
      </Show>
    </a>
  );
};

export default LinkButton;
