import type { JSX } from "solid-js";
import GroupHeading from "@/components/GroupHeading";
import type { Anchor } from "@/lib/anchors";

interface DownloadGroupProps {
  id: Anchor;
  title: string;
  description: string;
  children: JSX.Element;
}

/** A titled group of download cards that links can jump to */
export default function DownloadGroup(props: DownloadGroupProps) {
  return (
    <div id={props.id} class="flex flex-col gap-4 min-w-0 scroll-mt-10">
      <GroupHeading title={props.title} description={props.description} />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">{props.children}</div>
    </div>
  );
}
