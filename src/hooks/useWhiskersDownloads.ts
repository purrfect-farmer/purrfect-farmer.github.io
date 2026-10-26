import useLatestRelease from "@/hooks/useLatestRelease";
import { createMemo } from "solid-js";
import {
  DownloadKind,
  describeRelease,
  findDownloads,
  isUniversalMacBuild,
} from "@/lib/releases";
import { Platform, type DesktopPlatform } from "@/lib/platform";

/** The main download of each desktop platform */
export const PLATFORM_DOWNLOADS: Record<DesktopPlatform, DownloadKind> = {
  [Platform.WINDOWS]: DownloadKind.WINDOWS,
  [Platform.MAC]: DownloadKind.MAC,
  [Platform.LINUX]: DownloadKind.APPIMAGE,
};

/** The page listing every Whiskers release */
const RELEASES_PAGE = import.meta.env.VITE_APP_WHISKERS_GITHUB_RELEASE;

/** A hook for the downloads of the latest Whiskers release */
export default function useWhiskersDownloads() {
  const release = useLatestRelease(import.meta.env.VITE_APP_WHISKERS_REPO);

  /** The release files by kind */
  const downloads = createMemo(() => findDownloads(release.data?.assets ?? []));

  /** The direct link of a download, or the releases page */
  const linkOf = (kind: DownloadKind) =>
    downloads().get(kind)?.url ?? RELEASES_PAGE;

  /** The version, date and size of a download */
  const detailOf = (kind: DownloadKind) =>
    describeRelease(release, downloads().get(kind));

  /** Whether the macOS build runs only on Apple Silicon Macs */
  const isAppleSiliconOnly = createMemo(
    () => !!release.data && !isUniversalMacBuild(release.data.assets),
  );

  return { release, downloads, linkOf, detailOf, isAppleSiliconOnly };
}
