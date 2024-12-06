export function truncateText(text: string, maxLength: number = 50) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
