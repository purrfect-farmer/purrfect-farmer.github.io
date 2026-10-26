import AppIcon from "@/assets/images/icon-unwrapped-cropped.png?format=webp&h=480&as=meta:src;width;height";
import ContainerGrid from "@/components/ContainerGrid";
import HeroImage from "@/assets/images/hero.png?format=webp&as=meta:src;width;height";
import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";
import useWhiskersDownloads, {
  PLATFORM_DOWNLOADS,
} from "@/hooks/useWhiskersDownloads";
import {
  CURRENT_PLATFORM,
  PLATFORM_NAMES,
  Platform,
  isDesktopPlatform,
  type DesktopPlatform,
} from "@/lib/platform";
import {
  FaBrandsApple,
  FaBrandsChrome,
  FaBrandsGithub,
  FaBrandsLinux,
  FaBrandsWindows,
} from "solid-icons/fa";
import { BsMouse } from "solid-icons/bs";
import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "@/lib/utils";
import { isDirectDownload } from "@/lib/releases";

const HeroButton = LinkButton;

/** The icon of each desktop platform */
const PLATFORM_ICONS = {
  [Platform.WINDOWS]: FaBrandsWindows,
  [Platform.MAC]: FaBrandsApple,
  [Platform.LINUX]: FaBrandsLinux,
};

/** The button downloading Whiskers for the visitor's computer */
function WhiskersDownloadButton(props: { platform: DesktopPlatform }) {
  const whiskers = useWhiskersDownloads();

  /** The download kind of the platform */
  const kind = () => PLATFORM_DOWNLOADS[props.platform];

  /** The download link for the platform */
  const href = () => whiskers.linkOf(kind());

  return (
    <div class="flex flex-col items-center gap-2 w-fit max-w-full">
      <a
        href={href()}
        target={isDirectDownload(href()) ? undefined : "_blank"}
        class={cn(
          "flex items-center justify-center gap-2 min-w-0",
          "px-6 py-3 rounded-full",
          "bg-orange-500 text-white font-bold text-lg text-center",
        )}
      >
        <Dynamic
          component={PLATFORM_ICONS[props.platform]}
          class="size-6 shrink-0"
        />
        <span class="min-w-0">
          Download Whiskers for {PLATFORM_NAMES[props.platform]}
        </span>
      </a>

      {/* What Whiskers is, with its version and size */}
      <p class="min-h-5 w-0 min-w-full text-sm text-center text-balance">
        The desktop app for running many accounts side by side
      </p>
      <p class="min-h-5 text-sm text-center">{whiskers.detailOf(kind())}</p>

      {/* Apple Silicon Note */}
      <Show
        when={props.platform === Platform.MAC && whiskers.isAppleSiliconOnly()}
      >
        <p class="text-sm text-center font-bold text-orange-800">
          For Apple Silicon Macs (M1 or newer)
        </p>
      </Show>
    </div>
  );
}

export default function Hero() {
  return (
    <div class="flex flex-col min-h-dvh">
      <ContainerGrid class="grow">
        <div
          class={cn(
            "flex flex-col gap-4 items-center justify-center",
            "px-4 py-10 sm:p-10",
          )}
        >
          {/* App Icon */}
          <SiteImage
            image={AppIcon}
            alt=""
            loading="eager"
            class="h-28 lg:h-36 w-auto"
          />

          {/* Heading */}
          <SectionHeading as="h1" class="text-center">
            Purrfect Farmer
          </SectionHeading>

          {/* Description */}
          <p class="font-thin max-lg:max-w-96 text-center text-2xl lg:text-3xl">
            Automate Telegram Mini-Apps easily with an advanced tool.
          </p>

          {/* Download for this computer */}
          <Show when={isDesktopPlatform(CURRENT_PLATFORM) && CURRENT_PLATFORM}>
            {(platform) => <WhiskersDownloadButton platform={platform()} />}
          </Show>

          {/* Buttons */}
          <div class="flex flex-wrap justify-center gap-2">
            {/* Get Extension */}
            <HeroButton icon={FaBrandsChrome} href="#download">
              Get Extension
            </HeroButton>

            {/* Source Codes */}
            <HeroButton
              icon={FaBrandsGithub}
              href={import.meta.env.VITE_APP_GITHUB}
            >
              Source Codes
            </HeroButton>
          </div>

          {/* Other Platforms */}
          <Show when={isDesktopPlatform(CURRENT_PLATFORM)}>
            <a href="#download" class="text-sm font-bold text-orange-800">
              Other platforms
            </a>
          </Show>
        </div>

        {/* Image of Hero */}
        <div class="relative">
          <div class="lg:absolute inset-0 flex flex-col items-center justify-center">
            <SiteImage
              image={HeroImage}
              alt="Purrfect Farmer next to Purrfect Mirror Server"
              loading="eager"
              fetchpriority="high"
              class="rounded-xl w-130 object-contain max-h-full"
            />
          </div>
        </div>
      </ContainerGrid>

      {/* Scroll Down Indicator */}
      <div class="p-10 flex justify-center shrink-0">
        <BsMouse class="size-10 animate-bounce text-orange-500" />
      </div>
    </div>
  );
}
