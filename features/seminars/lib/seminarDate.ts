export function isSeminarUpcoming(eventDates: string[] = []): boolean {
  if (!eventDates?.length) return false;
  const now = Date.now();
  return eventDates.some((date) => new Date(date).getTime() >= now);
}

export function formatEventDates(eventDates: string[] = []): string {
  if (!eventDates?.length) return "";
  const formatter = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return eventDates.map((date) => formatter.format(new Date(date))).join(", ");
}
