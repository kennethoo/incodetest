function convertSecondsToTimer(seconds) {
  let hours: string | number = Math.floor(seconds / 3600); // Convert to hours
  let minutes: string | number = Math.floor((seconds % 3600) / 60); // Remaining seconds converted to minutes
  let remainingSeconds: string | number = seconds % 60; // Remaining seconds

  // Adding leading zeros if the number is less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return `${hours}:${minutes}:${remainingSeconds}`;
}
export default convertSecondsToTimer;
