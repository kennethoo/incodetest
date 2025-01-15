export function populateDays(currentMonth) {
  const days = [];
  const firstDayOfMonth = currentMonth.clone().startOf("month");
  const lastDayOfMonth = currentMonth.clone().endOf("month");

  // Calculate days from previous month
  const daysInPrevMonth = firstDayOfMonth.day();
  for (let i = 0; i < daysInPrevMonth; i++) {
    days.unshift(firstDayOfMonth.clone().subtract(i + 1, "day"));
  }

  // Days for current month
  const daysInMonth = currentMonth.daysInMonth();
  for (let i = 0; i < daysInMonth; i++) {
    days.push(firstDayOfMonth.clone().add(i, "day"));
  }

  // Days for next month
  const totalDays = days.length;
  const rows = 6; // or 5 based on your calendar design
  const cellsNeeded = rows * 7;
  const daysInNextMonth = cellsNeeded - totalDays;
  for (let i = 0; i < daysInNextMonth; i++) {
    days.push(lastDayOfMonth.clone().add(i + 1, "day"));
  }

  return days;
}

export function buildCalendar(currentMonth, days) {
  const calendarMatrix = Array(Math.ceil(days.length / 7))
    .fill(".")
    .map((_, weekIndex) => {
      const weekRow = Array(7)
        .fill(".")
        .map((_, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const day = days[index];
          return {
            day: day.format("D"),
            currentDay: day,
            currentMonth: currentMonth,
          };
        });

      return weekRow;
    });

  return calendarMatrix;
}
