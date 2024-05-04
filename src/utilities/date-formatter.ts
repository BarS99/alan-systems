export const formatDate = (
  date: Date | number,
  format: string = "en-GB"
): string => {
  return new Intl.DateTimeFormat(format, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).format(typeof date === "number" ? new Date(date) : date);
};
