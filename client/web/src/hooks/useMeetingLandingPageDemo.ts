function useMeetingLandingPageDemo(date) {
  const meetings = generateMeeting();
  const allMeetind = meetings.filter((item) => {
    const { startTime } = item;
    return startTime.includes(date);
  });
  return allMeetind;
}

export default useMeetingLandingPageDemo;

function generateMeeting() {
  const meetings = [
    {
      endTime: "2023-07-02 00:30",
      isActive: false,
      startTime: "2023-07-02 00:25",
      title: "Meet with Sophie",
    },
    {
      endTime: "2023-07-05 02:30",
      isActive: true,
      startTime: "2023-07-05 02:25",
      title: "Birthday party planning",
    },
    {
      endTime: "2023-07-08 01:30",
      isActive: true,
      startTime: "2023-07-08 01:25",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-05 12:30",
      isActive: false,
      startTime: "2023-07-05 12:25",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-06 12:45",
      isActive: true,
      startTime: "2023-07-06 12:30",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-07 14:45",
      isActive: true,
      startTime: "2023-07-07 14:30",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-08 15:45",
      isActive: false,
      startTime: "2023-07-08 15:30",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-02 16:30",
      isActive: false,
      startTime: "2023-07-02 16:45",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-02 17:30",
      isActive: false,
      startTime: "2023-07-02 17:45",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-02 18:30",
      isActive: true,
      startTime: "2023-07-02 18:45",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-03 08:30",
      isActive: false,
      startTime: "2023-07-03 09:45",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-03 18:30",
      isActive: false,
      startTime: "2023-07-03 18:45",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-04 19:35",
      isActive: true,
      startTime: "2023-07-04 19:45",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-02 03:30",
      isActive: false,
      startTime: "2023-07-02 03:50",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-02 15:30",
      isActive: false,
      startTime: "2023-07-02 15:25",
      title: generateMeetingTitle(),
    },
    {
      endTime: "2023-07-02 02:25",
      isActive: true,
      startTime: "2023-07-02 01:25",
      title: generateMeetingTitle(),
    },

    {
      startTime: "2023-07-02 05:25",
      endTime: "2023-07-02 06:25",
      isActive: true,
      title: generateMeetingTitle(),
    },

    {
      startTime: "2023-07-03 02:25",
      endTime: "2023-07-03 03:25",
      isActive: false,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-03 05:25",
      endTime: "2023-07-03 05:25",
      isActive: true,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-04 03:25",
      endTime: "2023-07-04 03:30",
      isActive: true,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-05 00:25",
      endTime: "2023-07-05 01:30",
      isActive: true,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-05 04:30",
      endTime: "2023-07-05 04:30",
      isActive: false,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-06 03:30",
      endTime: "2023-07-06 03:30",
      isActive: false,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-06 17:30",
      endTime: "2023-07-06 18:30",
      isActive: false,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-07 02:30",
      endTime: "2023-07-07 02:50",
      isActive: true,
      title: generateMeetingTitle(),
    },
    {
      startTime: "2023-07-08 02:80",
      endTime: "2023-07-08 02:50",
      isActive: true,
      title: generateMeetingTitle(),
    },
  ];

  return meetings;
}

function generateMeetingTitle() {
  const adjectives = [
    "Important",
    "Informative",
    "Productive",
    "Collaborative",
    "Creative",
    "Efficient",
    "Inspiring",
    "Strategic",
    "Team",
    "Virtual",
  ];
  const topics = [
    "Project Planning",
    "Brainstorming",
    "Marketing Campaign",
    "Review",
    "Development",
    "Team Building",
    "Training Workshop",
    "Strategy",
    "Evaluation",
  ];
  const names = [
    "John",
    "Emily",
    "Michael",
    "Sophia",
    "Daniel",
    "Olivia",
    "David",
    "Emma",
    "Andrew",
    "Kenneth",
    "Amzat",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return `${randomTopic} with ${randomName}`;
}
