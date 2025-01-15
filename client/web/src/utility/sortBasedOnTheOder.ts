const sortBasedOnTheOder = (listOne, listTwo) => {
  const maps = {};
  const visitedIds = new Set();
  const result = [];
  for (let item of listOne) {
    maps[item?.channelId] = item;
  }
  for (let id of listTwo) {
    const item = maps[id];
    if (item) {
      result.push(item);
      visitedIds.add(id);
    }
  }
  for (let item of listOne) {
    if (!visitedIds.has(item.channelId)) {
      result.push(item);
    }
  }
  return result;
};
export default sortBasedOnTheOder;
