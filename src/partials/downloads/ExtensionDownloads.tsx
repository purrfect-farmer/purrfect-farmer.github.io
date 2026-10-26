import CopyText from "@/components/CopyText";
import DownloadCard from "@/components/DownloadCard";
import GroupHeading from "@/components/GroupHeading";
import useLatestRelease from "@/hooks/useLatestRelease";
import { CURRENT_PLATFORM, Platform, isDesktopPlatform } from "@/lib/platform";
import { describeRelease } from "@/lib/releases";
import { Match, Switch, createMemo } from "solid-js";
import { cn } from "@/lib/utils";
import { FaBrandsChrome } from "solid-icons/fa";

/** The file name of the main extension build, e.g. purrfect-farmer-v8.crx */
const EXTENSION_CRX_PATTERN = /^purrfect-farmer-v[\d.]+\.crx$/;

/** The file name of the same build as a zip, e.g. purrfect-farmer-v8.zip */
const EXTENSION_ZIP_PATTERN = /^purrfect-farmer-v[\d.]+\.zip$/;

/** The page listing every extension release */
const RELEASES_PAGE = import.meta.env.VITE_APP_GITHUB_RELEASE;

/** Whether the visitor's device can install the extension */
const CAN_INSTALL =
  !isDesktopPlatform(CURRENT_PLATFORM) && CURRENT_PLATFORM !== Platform.MOBILE;

/** The extension download and how to install it */
export default function ExtensionDownloads() {
  const extension = useLatestRelease(import.meta.env.VITE_APP_EXTENSION_REPO);

  /** The main extension build */
  const extensionCrx = createMemo(() =>
    extension.data?.assets.find((asset) =>
      EXTENSION_CRX_PATTERN.test(asset.name),
    ),
  );

  /** The zip of the main build, shown under the .crx */
  const zipExtras = createMemo(() => {
    const zip = extension.data?.assets.find((asset) =>
      EXTENSION_ZIP_PATTERN.test(asset.name),
    );

    return zip ? [{ label: ".zip", href: zip.url }] : [];
  });

  return (
    <div class="flex flex-col gap-4 min-w-0">
      <GroupHeading
        title="Extension"
        description="For Chrome and mobile browsers with extension support."
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DownloadCard
          title="Browser"
          icon={FaBrandsChrome}
          href={extensionCrx()?.url ?? RELEASES_PAGE}
          label="Download .crx"
          detail={describeRelease(extension, extensionCrx())}
          extras={zipExtras()}
          recommended={CAN_INSTALL}
        />

        <div
          class={cn(
            "md:col-span-2 flex flex-col gap-2 min-w-0",
            "p-4 rounded-xl bg-orange-200/50",
          )}
        >
          <h4 class="font-bold text-lg text-orange-800">
            Installing the extension
          </h4>
          <Switch fallback={<DesktopSteps />}>
            <Match when={CURRENT_PLATFORM === Platform.ANDROID}>
              <AndroidSteps />
            </Match>
            <Match when={CURRENT_PLATFORM === Platform.MOBILE}>
              <p>
                This device can't install extensions. Use a browser with
                extension support, such as Kiwi or Mises on Android.
              </p>
            </Match>
          </Switch>
          <p class="text-sm">
            Not needed for Whiskers: it installs and updates the extension
            itself.
          </p>
        </div>
      </div>
    </div>
  );
}

/** The steps for installing the .crx in desktop Chrome */
function DesktopSteps() {
  return (
    <ol class="flex flex-col gap-1 list-decimal pl-5">
      <li>
        <div class="flex flex-col gap-2">
          Paste this address into a new tab and turn on Developer mode:
          <CopyText text="chrome://extensions" />
        </div>
      </li>
      <li>
        Drag and drop the downloaded .crx file onto the page. With the .zip,
        unzip it and choose Load unpacked instead.
      </li>
    </ol>
  );
}

/** The steps for installing the .crx in an Android browser like Kiwi */
function AndroidSteps() {
  return (
    <ol class="flex flex-col gap-1 list-decimal pl-5">
      <li>
        <div class="flex flex-col gap-2">
          Paste your browser's extensions page into a new tab and turn on
          Developer mode, e.g. in Kiwi:
          <CopyText text="kiwi://extensions" />
        </div>
      </li>
      <li>
        Tap <b>+ (from .zip/.crx/.user.js)</b> and pick the downloaded .crx or
        .zip file.
      </li>
    </ol>
  );
}
