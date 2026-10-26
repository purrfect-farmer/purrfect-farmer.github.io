import { fetchLatestRelease, type Release } from "@/lib/releases";
import { createResource } from "solid-js";

/** The latest-release request of each repository, shared by every caller */
const requests = new Map<string, Promise<Release>>();

/** Fetches a repository's latest release, retrying once if it fails */
const requestRelease = (repo: string) =>
  fetchLatestRelease(repo).catch(() => fetchLatestRelease(repo));

/** A hook for the latest release of a GitHub repository */
export default function useLatestRelease(repo: string) {
  const [release] = createResource(() => {
    if (!requests.has(repo)) requests.set(repo, requestRelease(repo));

    return requests.get(repo)!;
  });

  return {
    /** The release, once loaded */
    get data() {
      return release.state === "ready" ? release() : undefined;
    },

    /** Whether the release couldn't be loaded */
    get isError() {
      return release.state === "errored";
    },
  };
}
