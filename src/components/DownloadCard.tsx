import { For, Show, type Component, type JSX } from "solid-js";
import { HiOutlineArrowDownTray } from "solid-icons/hi";
import { cn } from "@/lib/utils";
import Card, { CardTitle } from "@/components/Card";
import LinkButton from "@/components/LinkButton";
import ReleaseDetail from "@/components/ReleaseDetail";

/** A secondary download shown under the main one */
export interface ExtraDownload {
  label: string;
  href: string;
}

interface DownloadCardProps {
  title: string;
  icon: Component<{ class: string }>;
  href: string;
  label: string;
  detail?: string;
  extras?: ExtraDownload[];
  recommended?: boolean;
  children?: JSX.Element;
}

/** A card with a platform's main download and its other formats */
export default function DownloadCard(props: DownloadCardProps) {
  return (
    <Card highlighted={props.recommended} class="gap-3">
      {/* Title */}
      <div class="flex flex-wrap items-center gap-2 min-w-0">
        <props.icon class="size-6 shrink-0 text-orange-500" />
        <CardTitle class="grow min-w-0 wrap-break-word">
          {props.title}
        </CardTitle>
        <Show when={props.recommended}>
          <span
            class={cn(
              "shrink-0 px-2 py-0.5 rounded-full",
              "bg-orange-500 text-white text-xs font-bold",
            )}
          >
            Your device
          </span>
        </Show>
      </div>

      {/* Main Download */}
      <LinkButton
        intent="secondary"
        icon={HiOutlineArrowDownTray}
        href={props.href}
      >
        {props.label}
      </LinkButton>

      {/* Version and Size */}
      <ReleaseDetail>{props.detail}</ReleaseDetail>

      {/* Other Formats */}
      <Show when={props.extras?.length}>
        <div class="flex flex-wrap justify-center gap-2">
          <For each={props.extras}>
            {(extra) => (
              <LinkButton size="sm" href={extra.href}>
                {extra.label}
              </LinkButton>
            )}
          </For>
        </div>
      </Show>

      {props.children}
    </Card>
  );
}
