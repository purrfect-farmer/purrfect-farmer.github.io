import { splitProps, type ComponentProps } from "solid-js";
import { cn } from "@/lib/utils";

interface SiteImageProps extends ComponentProps<"img"> {
  image: { src: string; width: number; height: number };
  alt: string;
}

/** An image with its size reserved, loaded when it nears the screen */
export default function SiteImage(props: SiteImageProps) {
  const [local, others] = splitProps(props, ["image", "class"]);

  return (
    <img
      loading="lazy"
      decoding="async"
      {...others}
      src={local.image.src}
      width={local.image.width}
      height={local.image.height}
      class={cn("h-auto max-w-full", local.class)}
    />
  );
}
