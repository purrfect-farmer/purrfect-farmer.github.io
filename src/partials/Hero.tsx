import AppleSiliconNote from "@/components/AppleSiliconNote";
import AppIcon from "@/assets/images/icon-unwrapped-cropped.png?format=webp&h=480&as=meta:src;width;height";
import HeroImage from "@/assets/images/hero.png?format=webp&as=meta:src;width;height";
import LinkButton from "@/components/LinkButton";
import ReleaseDetail from "@/components/ReleaseDetail";
import Section, { SECTION_PADDING } from "@/components/Section";
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
import { cn } from "@/lib/utils";
import { IS_WHISKERS } from "@/lib/client";
import { Anchor, hrefOf } from "@/lib/anchors";

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
      <LinkButton
        intent="primary"
        size="lg"
        icon={PLATFORM_ICONS[props.platform]}
        href={href()}
      >
        Download Whiskers for {PLATFORM_NAMES[props.platform]}
      </LinkButton>

      {/* What Whiskers is, with its version and size */}
      <p class="w-0 min-w-full text-sm text-center text-balance">
        The desktop app for running many accounts side by side
      </p>
      <ReleaseDetail>{whiskers.detailOf(kind())}</ReleaseDetail>

      {/* Apple Silicon Note */}
      <Show
        when={props.platform === Platform.MAC && whiskers.isAppleSiliconOnly()}
      >
        <AppleSiliconNote />
      </Show>
    </div>
  );
}

export default function Hero() {
  return (
    <div class="flex flex-col min-h-dvh">
      <Section layout="grid" spaced={false} class="grow">
        <div
          class={cn(
            "flex flex-col gap-4 items-center justify-center",
            SECTION_PADDING,
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
          <Show
            when={
              !IS_WHISKERS &&
              isDesktopPlatform(CURRENT_PLATFORM) &&
              CURRENT_PLATFORM
            }
          >
            {(platform) => <WhiskersDownloadButton platform={platform()} />}
          </Show>

          {/* Buttons */}
          <div class="flex flex-wrap justify-center gap-2">
            {/* Get Extension */}
            <Show when={!IS_WHISKERS}>
              <HeroButton
                icon={FaBrandsChrome}
                href={hrefOf(Anchor.DOWNLOAD_EXTENSION)}
              >
                Get Extension
              </HeroButton>
            </Show>

            {/* Source Codes */}
            <HeroButton
              icon={FaBrandsGithub}
              href={import.meta.env.VITE_APP_GITHUB}
            >
              Source Codes
            </HeroButton>
          </div>

          {/* Other Platforms */}
          <Show when={!IS_WHISKERS && isDesktopPlatform(CURRENT_PLATFORM)}>
            <a
              href={hrefOf(Anchor.DOWNLOAD_WHISKERS)}
              class="text-sm font-bold text-orange-800"
            >
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
      </Section>

      {/* Scroll Down Indicator */}
      <div class="p-10 flex justify-center shrink-0">
        <BsMouse class="size-10 animate-bounce text-orange-500" />
      </div>
    </div>
  );
}
