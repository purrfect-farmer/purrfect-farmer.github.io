import type { ComponentProps } from "solid-js";
import AppIcon from "@/assets/images/icon-unwrapped-cropped.png?format=webp&h=480&as=meta:src;width;height";
import LinkButton from "@/components/LinkButton";
import SiteImage from "@/components/SiteImage";
import { section } from "@/components/Section";
import { cn } from "@/lib/utils";

import {
  FaBrandsChrome,
  FaBrandsGithub,
  FaBrandsTelegram,
  FaSolidCode,
} from "solid-icons/fa";
import { HiOutlineChatBubbleBottomCenter } from "solid-icons/hi";

/** A round icon link in the footer */
const FooterButton = (props: ComponentProps<typeof LinkButton>) => (
  <LinkButton intent="dark" size="icon" aria-label={props.title} {...props} />
);

export default function Footer() {
  return (
    <div class="p-4">
      <div class={section({ spaced: false, class: "gap-4" })}>
        <SiteImage image={AppIcon} alt="" class="h-28 w-auto mx-auto" />

        {/* Footer Buttons */}
        <div
          class={cn(
            "flex justify-center items-center",
            "flex-wrap gap-2 bg-black p-2 rounded-full mx-auto",
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

        {/* Credits */}
        <p class="text-center text-sm">
          Made with care by{" "}
          <a
            href={import.meta.env.VITE_APP_DEV_PORTFOLIO}
            target="_blank"
            class="font-bold text-orange-500"
          >
            {import.meta.env.VITE_APP_DEV_NAME}
          </a>
        </p>

        <div class="text-center">&copy; Purrfect Farmer</div>
      </div>
    </div>
  );
}
