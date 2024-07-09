const today = new Date();

export const formattedDate = today.toLocaleDateString("en-UK", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
