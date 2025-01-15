export default function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = [];
  if (hours > 0) result.push(`${hours}${hours > 1 ? "s" : ""}`);
  if (minutes > 0) result.push(`${minutes}${minutes > 1 ? "s" : ""}`);
  if (remainingSeconds > 0 || result.length === 0) {
    result.push(`${remainingSeconds}${remainingSeconds > 1 ? "s" : ""}`);
  }

  return result.join(", ");
}
