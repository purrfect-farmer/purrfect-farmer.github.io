/** The ids of the page parts that links jump to */
export const Anchor = {
  DOWNLOAD: "download",
  DOWNLOAD_EXTENSION: "download-extension",
  DOWNLOAD_WHISKERS: "download-whiskers",
} as const;

export type Anchor = (typeof Anchor)[keyof typeof Anchor];

/** The link to a page part */
export const hrefOf = (anchor: Anchor) => `#${anchor}`;
