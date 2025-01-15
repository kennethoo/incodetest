function filterDuplicateObjects(arr) {
  // Map each object to its stringified version
  const stringifiedObjects = arr.map((obj) => JSON.stringify(obj));

  // Use a Set to filter out duplicates and convert back to array of objects
  const uniqueStringifiedObjects = [...new Set(stringifiedObjects)];

  // Parse the unique stringified objects back into objects
  return uniqueStringifiedObjects.map((objString) => JSON.parse(objString));
}

export default filterDuplicateObjects;
