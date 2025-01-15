export default function CalculateTheHeightOfTheEventInCalendar({
  startTime,
  endTime,
  blockHeight = 100,
}) {
  const start = convertTimeToMinutes(startTime);
  const end = convertTimeToMinutes(endTime);
  const eventHeight = Math.max((end - start) * blockHeight, 0);
  return eventHeight / 60;
}
function convertTimeToMinutes(time) {
  // Split the time string into hours and minutes
  const [hours, minutes] = time.split(":");

  // Convert hours and minutes to numbers
  const hoursInMinutes = parseInt(hours) * 60;
  const minutesAsNumber = parseInt(minutes);

  // Calculate total minutes since midnight
  const totalMinutes = hoursInMinutes + minutesAsNumber;

  return totalMinutes;
}
