export function isNumeric(str: unknown) {
  if (typeof str !== "string") return;
  return !isNaN(+str) && !isNaN(parseFloat(str));
}
