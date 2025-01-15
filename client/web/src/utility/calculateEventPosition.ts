export default function calculateEventPosition(startTime: string) {
  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const totalMinutes = startHour * 60 + startMinute;
  const position = totalMinutes * (100 / 60);
  return position + 60;
}
