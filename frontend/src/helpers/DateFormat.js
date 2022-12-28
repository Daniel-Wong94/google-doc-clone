const dateFormat = (stringDate) =>
  new Date(stringDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default dateFormat;
