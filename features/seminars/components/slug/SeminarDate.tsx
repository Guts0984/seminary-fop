const MONTHS_GENITIVE_UA = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

type SeminarDateProps = {
  eventDates?: string[] | null;
  eventTime?: string | null;
};

function formatDate(eventDates: string[]) {
  const sorted = [...eventDates]
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  if (sorted.length === 1 || first.getTime() === last.getTime()) {
    return `${first.getDate()} ${MONTHS_GENITIVE_UA[first.getMonth()]}`;
  }

  if (first.getMonth() === last.getMonth()) {
    return `${first.getDate()}-${last.getDate()} ${MONTHS_GENITIVE_UA[first.getMonth()]}`;
  }

  return `${first.getDate()} ${MONTHS_GENITIVE_UA[first.getMonth()]} - ${last.getDate()} ${MONTHS_GENITIVE_UA[last.getMonth()]}`;
}

export function SeminarDate({ eventDates, eventTime }: SeminarDateProps) {
  if (!eventDates || eventDates.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-1 bg-primary/5 px-3 text-center">
      <span className="text-sm font-normal  leading-snug text-primary">
        {formatDate(eventDates)}
      </span>

      {eventTime && (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
          {eventTime}
        </span>
      )}
    </div>
  );
}
