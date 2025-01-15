import moment from "moment-timezone";
import { dateFormat, timeFormat } from "utility/momentFormat";
interface generateAvailabilityType {
  workingHours: { startTime: string; endTime: string }[];
  busySlots: { startTime: string; endTime: string }[];
  toTimeZone: string;
  currentDate: string;
  fromTimeZone: string;
  slotDuration: number;
}

export function generateAvailability({
  workingHours,
  currentDate,
  busySlots,
  slotDuration,
  fromTimeZone,
  toTimeZone,
}: generateAvailabilityType): { startTime: string; endTime: string }[] {
  if (!busySlots) return [];
  workingHours.sort((a, b) => a.startTime.localeCompare(b.startTime));
  const boookedMap = buildStartTime(busySlots, toTimeZone);
  const availableSlots = [];
  for (let i = 0; i < workingHours.length; i++) {
    const { startTime, endTime } = workingHours[i];
    availableSlots.push(
      ...generateAvailableSlots({
        startTime,
        endTime,
        slotDuration,
        currentDateStr: currentDate,
        fromTimeZone,
        toTimeZone,
        boookedMap,
      }),
    );
  }
  return filterOutAvailableSlotsInThePast(availableSlots, toTimeZone);
}
function filterOutAvailableSlotsInThePast(availableSlots, toTimeZone) {
  const validAvailabilitySlot = [];
  const currentTime = moment.utc();
  for (let i = 0; i < availableSlots.length; i++) {
    const { startTime } = availableSlots[i];
    const timeFormat = moment(startTime).utc().format(dateFormat);

    const timeTwo = moment.utc(timeFormat, dateFormat);
    if (!timeTwo.isBefore(currentTime)) {
      validAvailabilitySlot.push(availableSlots[i]);
    }
  }
  return validAvailabilitySlot;
}

function buildStartTime(bookedTimes, toTimeZone) {
  const map = new Set();
  if (!bookedTimes.length) return map;
  for (let i = 0; i < bookedTimes.length; i++) {
    const { startTime } = bookedTimes[i];
    const utcDateTime = moment.utc(startTime, dateFormat);
    const targetDateTime = utcDateTime.tz(toTimeZone);
    map.add(targetDateTime.format(dateFormat));
  }
  return map;
}

export function generateTimeSlots(): string[] {
  const timeSlots = [];
  let time = moment("00:00", timeFormat);
  const endTime = moment("23:45", timeFormat);

  while (time.isSameOrBefore(endTime)) {
    let timeSlot = time.format(timeFormat);
    timeSlots.push(timeSlot);

    time.add(15, "minutes");
  }

  return timeSlots;
}
interface isValidAvailabilitySlotTimeType {
  startTime: string;
  endTime: string;
  previousAvailability?: [{ startTime: string; endTime: string }];
}

export function isValidAvailabilitySlot({
  startTime,
  endTime,
  previousAvailability,
}: isValidAvailabilitySlotTimeType) {
  var timeOne = moment(startTime, timeFormat);
  var timeTwo = moment(endTime, timeFormat);
  if (!timeOne.isBefore(timeTwo)) {
    return {
      succeeded: false,
      errorMessage: "Start time should be less than end time",
    };
  }
  if (!previousAvailability) return { succeeded: true };

  for (const currentEndTime of previousAvailability) {
    const currentStartTimeFormat = moment(currentEndTime.startTime, timeFormat);
    const currentEndTimeFormat = moment(currentEndTime.endTime, timeFormat);

    if (
      timeOne.isSame(currentStartTimeFormat) &&
      timeTwo.isSame(currentEndTimeFormat)
    ) {
      return {
        succeeded: false,
        errorMessage:
          "This time slot is a duplicate. Please choose another availability.",
      };
    }

    if (
      timeOne.isSame(currentStartTimeFormat) ||
      timeTwo.isSame(currentEndTimeFormat)
    ) {
      return {
        succeeded: false,
        errorMessage: "Two time slots cannot have the same start or end time.",
      };
    }

    if (
      timeOne.isBefore(currentStartTimeFormat) &&
      timeTwo.isAfter(currentEndTimeFormat)
    ) {
      return {
        succeeded: false,
        errorMessage:
          "This time slot has a merge conflict. Please choose another availability.",
      };
    }
  }

  return { succeeded: true };
}

//create a new function that actually check that because this code has bug
export function isThereAnyAvailability({
  workingHours,
  busySlots,
  slotDuration,
  fromTimeZone,
  toTimeZone,
  currentDate,
}: generateAvailabilityType): boolean {
  const boookedMap = buildStartTime(busySlots, toTimeZone);

  for (let i = 0; i < workingHours.length; i++) {
    const { startTime, endTime } = workingHours[i];
    const currentDateObj = moment.tz(currentDate, fromTimeZone);
    const currentDateTime = moment.tz(startTime, timeFormat, fromTimeZone).set({
      year: currentDateObj.year(),
      month: currentDateObj.month(),
      date: currentDateObj.date(),
    });
    const endTimeObj = moment.tz(endTime, timeFormat, fromTimeZone).set({
      year: currentDateObj.year(),
      month: currentDateObj.month(),
      date: currentDateObj.date(),
    });

    while (currentDateTime.isBefore(endTimeObj)) {
      const convertedStartTime = slotToTimeZone(
        currentDateTime,
        fromTimeZone,
        toTimeZone,
      ).format(dateFormat);
      if (!boookedMap.has(convertedStartTime)) {
        return true;
      }
      currentDateTime.add(slotDuration, "minutes");
    }
  }
  return false;
}

function isThereAnyAvailabilityV2({
  workingHours,
  busySlots,
  slotDuration,
  fromTimeZone,
  toTimeZone,
  currentDate,
}) {}

//update this function to generate the correct avaiblity slot
function generateAvailableSlots({
  startTime,
  endTime,
  slotDuration,
  currentDateStr,
  fromTimeZone,
  toTimeZone,
  boookedMap,
}) {
  const slots = [];
  const currentDate = moment.tz(currentDateStr, fromTimeZone);
  const currentDateTime = moment.tz(startTime, timeFormat, fromTimeZone).set({
    year: currentDate.year(),
    month: currentDate.month(),
    date: currentDate.date(),
  });
  const endTimeObj = moment.tz(endTime, timeFormat, fromTimeZone).set({
    year: currentDate.year(),
    month: currentDate.month(),
    date: currentDate.date(),
  });

  while (currentDateTime.isBefore(endTimeObj)) {
    const slotEndTime = currentDateTime.clone().add(slotDuration, "minutes");
    const convertedStartTime = slotToTimeZone(
      currentDateTime,
      fromTimeZone,
      toTimeZone,
    ).format(dateFormat);
    const convertedEndTime = slotToTimeZone(
      slotEndTime,
      fromTimeZone,
      toTimeZone,
    ).format(dateFormat);
    if (!boookedMap.has(convertedStartTime)) {
      slots.push({ startTime: convertedStartTime, endTime: convertedEndTime });
    }

    currentDateTime.add(slotDuration, "minutes");
  }

  return slots;
}

function slotToTimeZone(time, fromTimeZone, toTimeZone) {
  return moment.tz(time.format(), fromTimeZone).clone().tz(toTimeZone);
}
