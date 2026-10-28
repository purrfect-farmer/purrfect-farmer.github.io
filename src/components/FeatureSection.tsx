import type { JSX } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import Section from "@/components/Section";

/** The styles of a feature section, its text and its image */
export const featureSection = tv({
  slots: {
    content: "flex flex-col gap-2",
    media: "",
  },
  variants: {
    reversed: {
      true: {
        content: "lg:col-start-2",
        media: "lg:row-start-1 lg:col-start-1",
      },
    },
  },
});

interface FeatureSectionProps extends VariantProps<typeof featureSection> {
  media: JSX.Element;
  contentClass?: string;
  children: JSX.Element;
}

/** A section with a feature's text beside its image, image first when reversed */
export default function FeatureSection(props: FeatureSectionProps) {
  /** The slot styles for the layout */
  const styles = () => featureSection({ reversed: props.reversed });

  return (
    <Section layout="grid">
      <div class={styles().content({ class: props.contentClass })}>
        {props.children}
      </div>
      <div class={styles().media()}>{props.media}</div>
    </Section>
  );
}
