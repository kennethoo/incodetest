function addS(string, num) {
  if (num === 1) {
    return string;
  } else if (string.endsWith("y")) {
    return string.slice(0, -1) + "ies";
  } else {
    return string + "s";
  }
}
export default addS;
