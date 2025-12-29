import { splitProps, type ComponentProps } from "solid-js";
import AppIcon from "@/assets/images/icon-unwrapped-cropped.png?format=webp&h=480";
import { cn } from "@/lib/utils";

import {
  FaBrandsChrome,
  FaBrandsGithub,
  FaBrandsTelegram,
  FaSolidCode,
} from "solid-icons/fa";
import { HiOutlineChatBubbleBottomCenter } from "solid-icons/hi";
import { Dynamic } from "solid-js/web";
import type { IconTypes } from "solid-icons";

interface FooterButtonProps extends ComponentProps<"a"> {
  icon: IconTypes;
  class?: string;
}

const FooterButton = (props: FooterButtonProps) => {
  const [local, others] = splitProps(props, ["icon", "class"]);

  return (
    <a
      {...others}
      target="_blank"
      class={cn(
        "bg-neutral-800",
        "p-3 rounded-full",
        "inline-flex items-center justify-center gap-2",
        local.class
      )}
    >
      <Dynamic component={local.icon} class="text-orange-500 size-4" />
    </a>
  );
};

export default function Footer() {
  return (
    <div class="p-4">
      <div class="max-w-5xl mx-auto flex flex-col gap-4">
        <img src={AppIcon} class="h-28 mx-auto" />

        {/* Footer Buttons */}
        <div
          class={cn(
            "flex justify-center items-center",
            "flex-wrap gap-2 bg-black p-2 rounded-full mx-auto"
          )}
        >
          {/* Get Extension */}
          <FooterButton
            href={import.meta.env.VITE_APP_GITHUB_RELEASE}
            icon={FaBrandsChrome}
            title="Extension"
          />

          {/* Developer */}
          <FooterButton
            href={import.meta.env.VITE_APP_DEV}
            icon={FaSolidCode}
            title="Developer"
          />

          {/* Telegram Channel */}
          <FooterButton
            href={import.meta.env.VITE_APP_TELEGRAM_CHANNEL}
            icon={FaBrandsTelegram}
            title="Channel"
          />

          {/* Telegram Chat */}
          <FooterButton
            href={import.meta.env.VITE_APP_TELEGRAM_CHAT}
            icon={HiOutlineChatBubbleBottomCenter}
            title="Chat"
          />

          {/* GitHub */}
          <FooterButton
            href={import.meta.env.VITE_APP_GITHUB}
            icon={FaBrandsGithub}
            title="GitHub"
          />
        </div>
        <div class="text-center">&copy; Purrfect Farmer</div>
      </div>
    </div>
  );
}
