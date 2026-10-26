import CopyText from "@/components/CopyText";
import DownloadCard from "@/components/DownloadCard";
import GroupHeading from "@/components/GroupHeading";
import useWhiskersDownloads from "@/hooks/useWhiskersDownloads";
import { CURRENT_PLATFORM, Platform } from "@/lib/platform";
import { DownloadKind } from "@/lib/releases";
import { Show, createMemo } from "solid-js";
import { FaBrandsApple, FaBrandsLinux, FaBrandsWindows } from "solid-icons/fa";

/** The command that lets macOS open an unsigned app */
const MAC_FIX_COMMAND = 'xattr -cr "/Applications/Purrfect Whiskers.app"';

/** The other Linux formats, after the AppImage */
const LINUX_EXTRAS = [
  { kind: DownloadKind.DEB, label: ".deb" },
  { kind: DownloadKind.RPM, label: ".rpm" },
  { kind: DownloadKind.PACMAN, label: ".pacman" },
  { kind: DownloadKind.TAR, label: ".tar.gz" },
];

/** The Whiskers downloads for Windows, macOS and Linux */
export default function WhiskersDownloads(props: { showHeading?: boolean }) {
  const whiskers = useWhiskersDownloads();

  /** The other Linux formats in this release */
  const linuxExtras = createMemo(() =>
    LINUX_EXTRAS.filter(({ kind }) => whiskers.downloads().has(kind)).map(
      ({ kind, label }) => ({ label, href: whiskers.linkOf(kind) }),
    ),
  );

  return (
    <div class="flex flex-col gap-4 min-w-0">
      <Show when={props.showHeading}>
        <GroupHeading
          title="Purrfect Whiskers"
          description="The desktop app for running many accounts side by side."
        />
      </Show>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DownloadCard
          title="Windows"
          icon={FaBrandsWindows}
          href={whiskers.linkOf(DownloadKind.WINDOWS)}
          label="Download .exe"
          detail={whiskers.detailOf(DownloadKind.WINDOWS)}
          recommended={CURRENT_PLATFORM === Platform.WINDOWS}
        />

        <DownloadCard
          title="macOS"
          icon={FaBrandsApple}
          href={whiskers.linkOf(DownloadKind.MAC)}
          label="Download .dmg"
          detail={whiskers.detailOf(DownloadKind.MAC)}
          recommended={CURRENT_PLATFORM === Platform.MAC}
        >
          <Show when={whiskers.isAppleSiliconOnly()}>
            <p class="text-sm text-center font-bold text-orange-800">
              For Apple Silicon Macs (M1 or newer)
            </p>
          </Show>
          <p class="text-sm">
            If macOS won't open the app after installing, run this in Terminal:
          </p>
          <CopyText text={MAC_FIX_COMMAND} />
        </DownloadCard>

        <DownloadCard
          title="Linux"
          icon={FaBrandsLinux}
          href={whiskers.linkOf(DownloadKind.APPIMAGE)}
          label="Download AppImage"
          detail={whiskers.detailOf(DownloadKind.APPIMAGE)}
          extras={linuxExtras()}
          recommended={CURRENT_PLATFORM === Platform.LINUX}
        />
      </div>
    </div>
  );
}
