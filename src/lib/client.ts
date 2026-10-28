/** The apps that can open the website inside themselves */
export const ClientApp = {
  WHISKERS: "whiskers",
} as const;

export type ClientApp = (typeof ClientApp)[keyof typeof ClientApp];

/** The query parameter naming the app that opened the website */
export const CLIENT_APP_PARAM = "app";

/** The session storage key remembering the app for this tab */
const CLIENT_APP_STORAGE_KEY = "client-app";

/** Every known app */
const CLIENT_APPS: readonly string[] = Object.values(ClientApp);

/** A known app from a raw value, or null */
const toClientApp = (value: string | null): ClientApp | null =>
  value !== null && CLIENT_APPS.includes(value) ? (value as ClientApp) : null;

/** The app that opened the website, from the URL or this tab's storage */
function detectClientApp(): ClientApp | null {
  const fromUrl = toClientApp(
    new URLSearchParams(location.search).get(CLIENT_APP_PARAM),
  );

  try {
    if (fromUrl) {
      sessionStorage.setItem(CLIENT_APP_STORAGE_KEY, fromUrl);
      return fromUrl;
    }

    return toClientApp(sessionStorage.getItem(CLIENT_APP_STORAGE_KEY));
  } catch {
    return fromUrl;
  }
}

/** The app the website is running in, or null in a normal browser */
export const CURRENT_CLIENT_APP = detectClientApp();

/** Whether the website is running inside Whiskers */
export const IS_WHISKERS = CURRENT_CLIENT_APP === ClientApp.WHISKERS;
