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
        time: "7:30 - 9:00",
      },
      {
        time: "9:10 - 10:40",
      },
      {
        time: "10:50 - 12:20",
      },
      {
        time: "12:50 - 14:20",
      },
      {
        time: "14:30 - 16:00",
      },
      {
        time: "16:10 - 17:40",
      },
      {
        time: "17:50 - 19:20",
      },
      {
        time: "19:30 - 21:00",
      },
    ];
  }
}
