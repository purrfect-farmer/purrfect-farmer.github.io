import ExtensionDownloads from "@/partials/downloads/ExtensionDownloads";
import WhiskersDownloads from "@/partials/downloads/WhiskersDownloads";
import { CURRENT_PLATFORM, isDesktopPlatform } from "@/lib/platform";
import { Show } from "solid-js";
import { cn } from "@/lib/utils";

/** Whether the visitor is on a computer that runs Whiskers */
const IS_DESKTOP = isDesktopPlatform(CURRENT_PLATFORM);

/** The download section, with the visitor's own downloads first */
export default function Download() {
  return (
    <section
      id="download"
      class={cn(
        "w-full max-w-5xl mx-auto",
        "flex flex-col gap-10 px-4 py-10 sm:p-10",
      )}
    >
      <Show
        when={IS_DESKTOP}
        fallback={
          <>
            <ExtensionDownloads />
            <WhiskersDownloads showHeading />
          </>
        }
      >
        <WhiskersDownloads />
        <ExtensionDownloads />
      </Show>
    </section>
  );
}
