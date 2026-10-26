import { For, Show, type Component, type JSX } from "solid-js";
import { HiOutlineArrowDownTray } from "solid-icons/hi";
import { cn } from "@/lib/utils";
import { isDirectDownload } from "@/lib/releases";

/** The target of a download link: a new tab when it opens a page */
const targetOf = (href: string) =>
  isDirectDownload(href) ? undefined : "_blank";

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
    <div
      class={cn(
        "flex flex-col gap-3 min-w-0",
        "p-4 rounded-xl",
        "bg-orange-200/40 ring-2",
        props.recommended ? "ring-orange-500" : "ring-transparent",
      )}
    >
      {/* Title */}
      <div class="flex flex-wrap items-center gap-2 min-w-0">
        <props.icon class="size-6 shrink-0 text-orange-500" />
        <h4 class="grow min-w-0 break-words font-bold text-lg text-orange-800">
          {props.title}
        </h4>
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
      <a
        href={props.href}
        target={targetOf(props.href)}
        class={cn(
          "flex items-center justify-center gap-2 min-w-0",
          "px-4 py-2.5 rounded-full",
          "bg-orange-300 text-orange-900 font-bold text-center",
        )}
      >
        <HiOutlineArrowDownTray class="size-5 shrink-0" />
        <span class="min-w-0">{props.label}</span>
      </a>

      {/* Version and Size */}
      <p class="min-h-5 text-sm text-center">{props.detail ?? ""}</p>

      {/* Other Formats */}
      <Show when={props.extras?.length}>
        <div class="flex flex-wrap justify-center gap-2">
          <For each={props.extras}>
            {(extra) => (
              <a
                href={extra.href}
                target={targetOf(extra.href)}
                class={cn(
                  "px-3 py-1 rounded-full",
                  "bg-orange-200 text-orange-800 text-sm font-bold",
                )}
              >
                {extra.label}
              </a>
            )}
          </For>
        </div>
      </Show>

      {props.children}
    </div>
  );
}
