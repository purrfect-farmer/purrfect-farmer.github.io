/** The kinds of device a visitor can be on */
export const Platform = {
  WINDOWS: "windows",
  MAC: "mac",
  LINUX: "linux",
  ANDROID: "android",
  /** A phone or tablet without extension support, like an iPhone */
  MOBILE: "mobile",
  OTHER: "other",
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];

/** The desktop platforms Whiskers is built for */
export const DESKTOP_PLATFORMS = [
  Platform.WINDOWS,
  Platform.MAC,
  Platform.LINUX,
] as const;

export type DesktopPlatform = (typeof DESKTOP_PLATFORMS)[number];

/** The display name of each desktop platform */
export const PLATFORM_NAMES: Record<DesktopPlatform, string> = {
  [Platform.WINDOWS]: "Windows",
  [Platform.MAC]: "macOS",
  [Platform.LINUX]: "Linux",
};

/** The client hints some browsers expose about the device */
interface UserAgentData {
  mobile?: boolean;
  platform?: string;
}

/** The visitor's platform, read from the browser */
function detectPlatform(): Platform {
  const hints = (navigator as { userAgentData?: UserAgentData }).userAgentData;
  const userAgent = navigator.userAgent;

  /** Whether a touch device reports Linux, as Android tablets can */
  const isTouchLinux =
    /Linux/.test(userAgent) &&
    navigator.maxTouchPoints > 1 &&
    hints?.platform !== "Linux";

  /** Whether the device runs Android */
  const isAndroid =
    hints?.platform === "Android" || /Android/i.test(userAgent) || isTouchLinux;

  if (isAndroid) return Platform.ANDROID;

  /** Whether the device is another phone or tablet, like an iPhone */
  const isMobile =
    hints?.mobile === true ||
    /iPhone|iPad|iPod|Mobile/i.test(userAgent) ||
    (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1);

  if (isMobile) return Platform.MOBILE;

  /** The platform name from the hints or the user agent */
  const name = `${hints?.platform ?? ""} ${userAgent}`;

  if (/Win/i.test(name)) return Platform.WINDOWS;
  if (/Mac/i.test(name)) return Platform.MAC;
  if (/CrOS/i.test(name)) return Platform.OTHER;
  if (/Linux|X11/i.test(name)) return Platform.LINUX;

  return Platform.OTHER;
}

/** The visitor's platform */
export const CURRENT_PLATFORM = detectPlatform();

/** Whether a platform is one Whiskers runs on */
export const isDesktopPlatform = (
  platform: Platform,
): platform is DesktopPlatform =>
  (DESKTOP_PLATFORMS as readonly Platform[]).includes(platform);
