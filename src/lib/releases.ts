/** A file attached to a GitHub release */
export interface ReleaseAsset {
  name: string;
  url: string;
  size: number;
}

/** The parts of a GitHub release the site uses */
export interface Release {
  version: string;
  publishedAt: Date | null;
  url: string;
  assets: ReleaseAsset[];
}

/** The kinds of Whiskers download */
export const DownloadKind = {
  WINDOWS: "windows",
  MAC: "mac",
  APPIMAGE: "appimage",
  DEB: "deb",
  RPM: "rpm",
  PACMAN: "pacman",
  TAR: "tar",
} as const;

export type DownloadKind = (typeof DownloadKind)[keyof typeof DownloadKind];

/** The file name pattern of each download kind */
const DOWNLOAD_PATTERNS: [DownloadKind, RegExp][] = [
  [DownloadKind.WINDOWS, /-setup\.exe$/],
  [DownloadKind.MAC, /\.dmg$/],
  [DownloadKind.APPIMAGE, /\.AppImage$/],
  [DownloadKind.DEB, /\.deb$/],
  [DownloadKind.RPM, /\.rpm$/],
  [DownloadKind.PACMAN, /\.pacman$/],
  [DownloadKind.TAR, /\.tar\.gz$/],
];

/** A release file from untrusted API data, or null */
function toAsset(raw: unknown): ReleaseAsset | null {
  if (!raw || typeof raw !== "object") return null;

  const { name, browser_download_url, size } = raw as Record<string, unknown>;

  if (typeof name !== "string" || typeof browser_download_url !== "string") {
    return null;
  }

  if (!browser_download_url.startsWith("https://github.com/")) return null;

  return {
    name,
    url: browser_download_url,
    size: typeof size === "number" ? size : 0,
  };
}

/** A release from untrusted API data */
function toRelease(raw: unknown): Release {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;

  /** The publish date, or null when missing or invalid */
  const publishedAt =
    typeof data.published_at === "string" ? new Date(data.published_at) : null;

  if (typeof data.tag_name !== "string" || typeof data.html_url !== "string") {
    throw new Error("The release has no version");
  }

  return {
    version: data.tag_name,
    publishedAt:
      publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null,
    url: data.html_url,
    assets: Array.isArray(data.assets)
      ? data.assets.map(toAsset).filter((asset) => asset !== null)
      : [],
  };
}

/** Fetches the latest release of a GitHub repository, e.g. "owner/name" */
export async function fetchLatestRelease(repo: string): Promise<Release> {
  const response = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
    { headers: { Accept: "application/vnd.github+json" } },
  );

  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status}`);
  }

  return toRelease(await response.json());
}

/** The release file of each download kind */
export function findDownloads(assets: ReleaseAsset[]) {
  /** The files by kind */
  const downloads = new Map<DownloadKind, ReleaseAsset>();

  for (const asset of assets) {
    const match = DOWNLOAD_PATTERNS.find(([, pattern]) =>
      pattern.test(asset.name),
    );

    if (match && !downloads.has(match[0])) downloads.set(match[0], asset);
  }

  return downloads;
}

/** Whether the macOS build runs on Intel as well as Apple Silicon */
export const isUniversalMacBuild = (assets: ReleaseAsset[]) =>
  assets.some((asset) => /universal-mac\.zip$/.test(asset.name));

/** The formatter of release dates, e.g. "Oct 26, 2026" */
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

/** The formatter of file sizes in megabytes */
const sizeFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
});

/** The text shown when a download links to the releases page */
const RELEASES_PAGE_TEXT = "Opens the releases page";

/** The state of a release request */
interface ReleaseQuery {
  data?: Release;
  isError: boolean;
}

/** The version, date and size of a download, e.g. "v3.1.0 · 112 MB" */
export function describeRelease(query: ReleaseQuery, asset?: ReleaseAsset) {
  const release = query.data;

  if (!release) return query.isError ? RELEASES_PAGE_TEXT : "";
  if (!asset) return RELEASES_PAGE_TEXT;

  return [
    release.version,
    release.publishedAt ? formatReleaseDate(release.publishedAt) : null,
    asset.size ? formatFileSize(asset.size) : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** Whether a link downloads a release file rather than opening a page */
export const isDirectDownload = (url: string) =>
  url.includes("/releases/download/");

/** A release date for display */
export const formatReleaseDate = (date: Date) => dateFormatter.format(date);

/** A file size for display, e.g. "112 MB", kept on one line */
export const formatFileSize = (bytes: number) =>
  `${sizeFormatter.format(bytes / 1_000_000)}\u00a0MB`;
