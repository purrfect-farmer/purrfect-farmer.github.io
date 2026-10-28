import ExtensionDownloads from "@/partials/downloads/ExtensionDownloads";
import WhiskersDownloads from "@/partials/downloads/WhiskersDownloads";
import { CURRENT_PLATFORM, isDesktopPlatform } from "@/lib/platform";
import { Show } from "solid-js";
import Section from "@/components/Section";
import { Anchor } from "@/lib/anchors";

/** Whether the visitor is on a computer that runs Whiskers */
const IS_DESKTOP = isDesktopPlatform(CURRENT_PLATFORM);

/** The download section, with the visitor's own downloads first */
export default function Download() {
  return (
    <Section id={Anchor.DOWNLOAD}>
      <Show
        when={IS_DESKTOP}
        fallback={
          <>
            <ExtensionDownloads />
            <WhiskersDownloads />
          </>
        }
      >
        <WhiskersDownloads />
        <ExtensionDownloads />
      </Show>
    </Section>
  );
}
