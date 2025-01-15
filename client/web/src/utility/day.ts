export const monday: string = "monday";
export const tuesday: string = "tuesday";
export const wednesday: string = "wednesday";
export const thursday: string = "thursday";
export const friday: string = "friday";
export const saturday: string = "saturday";
export const sunday: string = "sunday";

export function getDay(dayIndex: number): string {
  if (dayIndex === 0) {
    return monday;
  } else if (dayIndex === 1) {
    return tuesday;
  } else if (dayIndex === 2) {
    return wednesday;
  } else if (dayIndex === 3) {
    return thursday;
  } else if (dayIndex === 4) {
    return friday;
  } else if (dayIndex === 5) {
    return saturday;
  } else if (dayIndex === 6) {
    return sunday;
  } else {
    throw new Error("Invalid day index");
  }
}
