export default async function checkLinkStatus(link) {
  try {
    const response = await fetch(link, {
      mode: "no-cors",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return false;
    } else if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
