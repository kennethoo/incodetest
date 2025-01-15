function generateUserUid(string: string): number {
  if (!string) {
    return 0;
  }
  const newString = string?.slice(0, 4);
  let result = "";
  for (let i = 0; i < newString.length; i++) {
    const char = newString[i];
    if (/[a-zA-Z]/.test(char)) {
      const number = char.toLowerCase().charCodeAt(0) - "a".charCodeAt(0) + 1;
      result += number;
    } else if (/[0-9]/.test(char)) {
      result += char;
    }
  }
  return parseInt(result, 10);
}
export default generateUserUid;
