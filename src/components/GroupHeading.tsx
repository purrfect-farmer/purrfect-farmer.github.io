/** The heading of a group inside a section */
export default function GroupHeading(props: {
  title: string;
  description: string;
}) {
  return (
    <div class="flex flex-col gap-1 min-w-0">
      <h3 class="text-xl text-orange-500 font-turret-road text-center">
        {props.title}
      </h3>
      <p class="text-center">{props.description}</p>
    </div>
  );
}
