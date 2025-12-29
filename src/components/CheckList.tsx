import { For } from "solid-js";
import { HiSolidCheckCircle } from "solid-icons/hi";

interface CheckListProps {
  items: string[];
}

export default function CheckList(props: CheckListProps) {
  return (
    <div class="flex flex-col gap-2">
      <For each={props.items}>
        {(item) => (
          <div class="flex items-center gap-2">
            <HiSolidCheckCircle class="text-orange-500 size-5 shrink-0" />
            <h4 class="font-bold text-orange-800 grow">{item}</h4>
          </div>
        )}
      </For>
    </div>
  );
}
