import { Match, Switch, createSignal, onCleanup } from "solid-js";
import {
  HiOutlineCheck,
  HiOutlineClipboardDocument,
  HiOutlineXMark,
} from "solid-icons/hi";
import { cn } from "@/lib/utils";

/** How long the copy result shows, in milliseconds */
const RESULT_DURATION = 2000;

/** The states of the copy button */
const CopyState = {
  IDLE: "idle",
  COPIED: "copied",
  FAILED: "failed",
} as const;

type CopyState = (typeof CopyState)[keyof typeof CopyState];

/** The label of each copy state */
const STATE_LABELS: Record<CopyState, string> = {
  [CopyState.IDLE]: "Copy",
  [CopyState.COPIED]: "Copied",
  [CopyState.FAILED]: "Couldn't copy; select the text instead",
};

/** A line of code, like a command or address, with a button that copies it */
export default function CopyText(props: { text: string }) {
  /** The result of the last copy */
  const [state, setState] = createSignal<CopyState>(CopyState.IDLE);

  /** The timer that clears the result */
  let timer: number | undefined;

  onCleanup(() => clearTimeout(timer));

  /** Shows a copy result for a moment */
  const showResult = (result: CopyState) => {
    setState(result);
    clearTimeout(timer);
    timer = setTimeout(() => setState(CopyState.IDLE), RESULT_DURATION);
  };

  /** The handler for copying the text */
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(props.text);
      showResult(CopyState.COPIED);
    } catch {
      showResult(CopyState.FAILED);
    }
  };

  return (
    <div
      class={cn(
        "flex items-center gap-2 min-w-0",
        "p-1 pl-3 rounded-xl",
        "bg-neutral-900 text-orange-100",
      )}
    >
      <code class="grow min-w-0 text-xs break-words">{props.text}</code>
      <button
        type="button"
        title={STATE_LABELS[state()]}
        aria-label={STATE_LABELS[state()]}
        onClick={copy}
        class={cn(
          "shrink-0 p-2 rounded-lg",
          "bg-neutral-800 text-orange-300 hover:text-orange-100",
        )}
      >
        <Switch fallback={<HiOutlineClipboardDocument class="size-4" />}>
          <Match when={state() === CopyState.COPIED}>
            <HiOutlineCheck class="size-4" />
          </Match>
          <Match when={state() === CopyState.FAILED}>
            <HiOutlineXMark class="size-4" />
          </Match>
        </Switch>
      </button>

      {/* Spoken Result */}
      <span class="sr-only" aria-live="polite">
        {state() === CopyState.IDLE ? "" : STATE_LABELS[state()]}
      </span>
    </div>
  );
}
