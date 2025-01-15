function parseCompanyNameFromLink(url) {
  try {
    const parsedUrl = new URL(url);
    const names = parsedUrl.hostname.split(".");
    if (names.length === 3) {
      return names[1];
    } else {
      return names[0];
    }
  } catch (error) {
    return null;
  }
}

export default parseCompanyNameFromLink;
