export default class Constants {
  get campuses() {
    return [
      {
        id: "HN",
        name: "Ha Noi",
      },
      {
        id: "HCM",
        name: "Ho Chi Minh",
      },
      {
        id: "DN",
        name: "Da Nang",
      },
      {
        id: "CT",
        name: "Can Tho",
      },
    ];
  }

  get departments() {
    return [
      {
        id: "GBH",
        name: "Business",
      },
      {
        id: "GCH",
        name: "Computing",
      },
      {
        id: "GDH",
        name: "Graphic Design",
      },
      {
        id: "GFH",
        name: "Finance",
      },
    ];
  }

  get programmes() {
    return [
      {
        id: "ENG",
        name: "English Programme",
      },
      {
        id: "F2G",
        name: "F2G",
      },
      {
        id: "SC",
        name: "Supplementary Courses",
      },
      {
        id: "UOG",
        name: "Top-Up",
      },
    ];
  }

  get terms() {
    return [
      {
        id: "SP",
        name: "Spring",
      },
      {
        id: "SU",
        name: "Summer",
      },
      {
        id: "FA",
        name: "Fall",
      },
    ];
  }

  get requestTypes() {
    return [
      {
        id: "RQ-01",
        name: "Interim Academic Transcript",
      },
      {
        id: "RQ-02",
        name: "Interruption of Study",
      },
      {
        id: "RQ-03",
        name: "Status Letter",
      },
      {
        id: "RQ-04",
        name: "Mark Recheck",
      },
      {
        id: "RQ-05",
        name: "Transfer to Another Programme",
      },
      {
        id: "RQ-06",
        name: "Transfer to Another Institution",
      },
      {
        id: "RQ-07",
        name: "Others",
      },
    ];
  }

  get daysOfTheWeek() {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  }
  get slot() {
    return [
      {
        id: 1,
        time: "7:30 - 9:00",
      },
      {
        id: 2,
        time: "9:10 - 10:40",
      },
      {
        id: 3,
        time: "10:50 - 12:20",
      },
      {
        id: 4,
        time: "12:50 - 14:20",
      },
      {
        id: 5,
        time: "14:30 - 16:00",
      },
      {
        id: 6,
        time: "16:10 - 17:40",
      },
      {
        id: 7,
        time: "17:50 - 19:20",
      },
      {
        id: 8,
        time: "19:30 - 21:00",
      },
    ];
  }

  get daysOfTheWeekForm() {
    return [
      {
        name: "Sunday",
        short: "Sun",
        index: 0,
      },
      {
        name: "Monday",
        short: "Mon",
        index: 1,
      },
      {
        name: "Tuesday",
        short: "Tue",
        index: 2,
      },
      {
        name: "Wednesday",
        short: "Wed",
        index: 3,
      },
      {
        name: "Thursday",
        short: "Thu",
        index: 4,
      },
      {
        name: "Friday",
        short: "Fri",
        index: 5,
      },
      {
        name: "Saturday",
        short: "Sat",
        index: 6,
      },
    ];
  }

  get grades() {
    return [
      {
        name: "Refer",
        value: "F",
        number: 0,
      },
      {
        name: "Pass",
        value: "P",
        number: 4,
      },
      {
        name: "Merit",
        value: "M",
        number: 7,
      },
      {
        name: "Distinction",
        value: "D",
        number: 10,
      },
    ];
  }

  get levels() {
    return [
      {
        name: "Preparatory",
        value: "Preparatory"
      },
      {
        name: "1",
        value: "1"
      }, {
        name: "2",
        value: "2"
      }, {
        name: "3",
        value: "3"
      }, {
        name: "4",
        value: "4"
      }, {
        name: "5",
        value: "5"
      }, {
        name: "6",
        value: "6"
      }, {
        name: "7",
        value: "7"
      },
    ]
  }
}
