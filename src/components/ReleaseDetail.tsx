import type { JSX } from "solid-js";

/** The version and size line under a download */
export default function ReleaseDetail(props: { children?: JSX.Element }) {
  return <p class="min-h-5 text-sm text-center">{props.children}</p>;
}
