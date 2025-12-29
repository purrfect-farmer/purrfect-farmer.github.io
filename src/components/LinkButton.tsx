import { splitProps, type Component, type ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "@/lib/utils";

interface LinkButtonProps extends ComponentProps<"a"> {
  icon: Component<{ class: string }>;
}

const LinkButton = (props: LinkButtonProps) => {
  const [local, others] = splitProps(props, ["icon", "children", "class"]);

  return (
    <a
      {...others}
      target="_blank"
      class={cn(
        "bg-orange-200",
        "p-2 px-4 rounded-full",
        "inline-flex items-center justify-center gap-2",
        local.class
      )}
    >
      <Dynamic component={local.icon} class="text-orange-500 w-5 h-5" />
      <div class="text-orange-800 font-bold">{local.children}</div>
    </a>
  );
};

export default LinkButton;
