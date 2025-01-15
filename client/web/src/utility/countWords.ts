export default function countWords(str) {
  // Split the string by spaces and filter out any empty strings
  const words = str.split(/\s+/).filter((word) => word.length > 0);
  // Return the number of words
  return words.length;
}
