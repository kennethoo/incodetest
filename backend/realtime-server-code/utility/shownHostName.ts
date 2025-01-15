function showTheHostName(participants, user, isHost) {
  const userNames = [];
  for (let i = 0; i < participants.length; i++) {
    const { username, status } = participants[i];
    if (status === meetingSessionMannager.CONFIRM) {
      userNames.push(username);
    }
  }
  if (userNames.length === 1) {
    return "w/ myself ";
  }
  const usernameWithoutMine = userNames.filter(
    (name) => name !== user?.username,
  );
  if (usernameWithoutMine.length === 0) {
    return "";
  }
  return `w/ ${usernameWithoutMine.join(", ")}`;
}
