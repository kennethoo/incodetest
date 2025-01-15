function structureMeetingRoomVideoGrid(userList, numberOfPeople = 6) {
  const result = [];
  let currentPointer = 0;
  const totalCount = userList.length;
  while (currentPointer < totalCount) {
    const subList = [];
    for (let i = 0; i < numberOfPeople; i++) {
      if (currentPointer < totalCount) {
        subList.push(userList[currentPointer]);
        currentPointer++;
      } else {
        break;
      }
    }
    result.push([...subList]);
  }
  return result;
}

export default structureMeetingRoomVideoGrid;
