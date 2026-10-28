import Card, { CardTitle } from "@/components/Card";
import CopyText from "@/components/CopyText";
import DownloadCard from "@/components/DownloadCard";
import DownloadGroup from "@/components/DownloadGroup";
import useLatestRelease from "@/hooks/useLatestRelease";
import { Anchor } from "@/lib/anchors";
import { CURRENT_PLATFORM, Platform, isDesktopPlatform } from "@/lib/platform";
import { describeRelease } from "@/lib/releases";
import { Match, Switch, createMemo, type JSX } from "solid-js";
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
    <DownloadGroup
      id={Anchor.DOWNLOAD_EXTENSION}
      title="Extension"
      description="For Chrome and mobile browsers with extension support."
    >
      <DownloadCard
        title="Browser"
        icon={FaBrandsChrome}
        href={extensionCrx()?.url ?? RELEASES_PAGE}
        label="Download .crx"
        detail={describeRelease(extension, extensionCrx())}
        extras={zipExtras()}
        recommended={CAN_INSTALL}
      />

      <Card class="md:col-span-2 gap-2">
        <CardTitle>Installing the extension</CardTitle>
        <Switch fallback={<DesktopSteps />}>
          <Match when={CURRENT_PLATFORM === Platform.ANDROID}>
            <AndroidSteps />
          </Match>
          <Match when={CURRENT_PLATFORM === Platform.MOBILE}>
            <p>
              This device can't install extensions. Use a browser with extension
              support, such as Kiwi or Mises on Android.
            </p>
          </Match>
        </Switch>
        <p class="text-sm">
          Not needed for Whiskers: it installs and updates the extension itself.
        </p>
      </Card>
    </DownloadGroup>
  );
}

/** A numbered list of install steps */
function Steps(props: { children: JSX.Element }) {
  return (
    <ol class="flex flex-col gap-1 list-decimal pl-5">{props.children}</ol>
  );
}

/** An install step with a line to copy under its text */
function CopyStep(props: { text: string; children: JSX.Element }) {
  return (
    <li>
      <div class="flex flex-col gap-2">
        {props.children}
        <CopyText text={props.text} />
      </div>
    </li>
  );
}

/** The steps for installing the .crx in desktop Chrome */
function DesktopSteps() {
  return (
    <Steps>
      <CopyStep text="chrome://extensions">
        Paste this address into a new tab and turn on Developer mode:
      </CopyStep>
      <li>
        Drag and drop the downloaded .crx file onto the page. With the .zip,
        unzip it and choose Load unpacked instead.
      </li>
    </Steps>
  );
}

/** The steps for installing the .crx in an Android browser like Kiwi */
function AndroidSteps() {
  return (
    <Steps>
      <CopyStep text="kiwi://extensions">
        Paste your browser's extensions page into a new tab and turn on
        Developer mode, e.g. in Kiwi:
      </CopyStep>
      <li>
        Tap <b>+ (from .zip/.crx/.user.js)</b> and pick the downloaded .crx or
        .zip file.
      </li>
    </Steps>
  );
}
