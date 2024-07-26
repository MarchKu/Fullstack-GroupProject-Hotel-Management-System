export const dateFormatter = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
