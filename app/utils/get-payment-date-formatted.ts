export function getPaymentDateFormatted(date: Date | string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const dateFormatted = new Intl.DateTimeFormat("en-US", options)
    .format(typeof date === "string" ? new Date(date) : date)
    .replace(/\,/gi, " ");

  return "Due " + dateFormatted;
}
