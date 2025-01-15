function filterDuplicateObjects(arr) {
  var uniqueObjects = [];
  var encounteredObjects = {};

  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    var objString = JSON.stringify(obj);

    if (!encounteredObjects[objString]) {
      uniqueObjects.push(obj);
      encounteredObjects[objString] = true;
    }
  }

  return uniqueObjects;
}

module.exports = filterDuplicateObjects;
