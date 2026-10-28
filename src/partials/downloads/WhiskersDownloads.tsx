import AppleSiliconNote from "@/components/AppleSiliconNote";
import CopyText from "@/components/CopyText";
import DownloadCard from "@/components/DownloadCard";
import DownloadGroup from "@/components/DownloadGroup";
import useWhiskersDownloads from "@/hooks/useWhiskersDownloads";
import { Anchor } from "@/lib/anchors";
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
export default function WhiskersDownloads() {
  const whiskers = useWhiskersDownloads();

  /** The other Linux formats in this release */
  const linuxExtras = createMemo(() =>
    LINUX_EXTRAS.filter(({ kind }) => whiskers.downloads().has(kind)).map(
      ({ kind, label }) => ({ label, href: whiskers.linkOf(kind) }),
    ),
  );

  return (
    <DownloadGroup
      id={Anchor.DOWNLOAD_WHISKERS}
      title="Desktop App"
      description="For Windows, macOS and Linux. Installs and updates the extension for you."
    >
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
          <AppleSiliconNote />
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
    </DownloadGroup>
  );
}
