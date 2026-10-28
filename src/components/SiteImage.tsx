import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

/** The styles of a site image */
export const siteImage = tv({
  base: "h-auto max-w-full",
  variants: {
    framed: {
      true: "ring-4 ring-orange-300 rounded-sm",
    },
  },
});

interface SiteImageProps
  extends ComponentProps<"img">, VariantProps<typeof siteImage> {
  image: { src: string; width: number; height: number };
  alt: string;
}

/** An image with its size reserved, loaded when it nears the screen */
export default function SiteImage(props: SiteImageProps) {
  const [local, others] = splitProps(props, ["image", "framed", "class"]);

  return (
    <img
      loading="lazy"
      decoding="async"
      {...others}
      src={local.image.src}
      width={local.image.width}
      height={local.image.height}
      class={siteImage({ framed: local.framed, class: local.class })}
    />
  );
}
