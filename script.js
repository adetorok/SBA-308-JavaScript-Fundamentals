
console.log("Question 1");
// // the course data. // //
const courseInfo = {
  id: 451,
  name: "IntroJS"
};

// // the assignment data. // //
const assignmentGroup = {
  id: 12345,
  name: "JS Camentals",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Module",
      due_at: "2025-08-10",
      points_possible: 500
    }
  ]
};

// // the learner submission data. // //
const learnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2025-08-09",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

const getLearnerData = (course, ag, submissions) => {
  try {
    if (ag.course_id !== course.id) {
      throw new Error("Invalid input");
    }

    const now = new Date("2025-08-11");
    const assignmentsMap = {};

    ag.assignments.forEach(assignment => {
      if (typeof assignment.points_possible !== 'number' || assignment.points_possible <= 0) {
        return;
      }
      if (new Date(assignment.due_at) <= now) {
        assignmentsMap[assignment.id] = {
          points: assignment.points_possible,
          due_at: new Date(assignment.due_at)
        };
      }
    });

    const learnerResults = {};

    submissions.forEach(sub => {
      const assignment = assignmentsMap[sub.assignment_id];
      if (!assignment) {
        return;
      }
      if (!learnerResults[sub.learner_id]) {
        learnerResults[sub.learner_id] = {
          id: sub.learner_id,
          totalScore: 0,
          totalPossible: 0,
          scores: {}
        };
      }
      const learner = learnerResults[sub.learner_id];
      let score = sub.submission.score;
      const submitted_at = new Date(sub.submission.submitted_at);

      if (submitted_at > assignment.due_at) {
        score -= assignment.points * 0.10;
      }

      learner.totalScore += score;
      learner.totalPossible += assignment.points;
      learner.scores[sub.assignment_id] = score / assignment.points;
    });

    const finalResult = [];
    for (const learnerId in learnerResults) {
      const learner = learnerResults[learnerId];
      const avg = learner.totalPossible > 0 ? learner.totalScore / learner.totalPossible : 0;
      
      const learnerOutput = {
        id: learner.id,
        avg: avg
      };
      
      for (const assignmentId in learner.scores) {
          learnerOutput[assignmentId] = learner.scores[assignmentId];
      }

      finalResult.push(learnerOutput);
    }
    return finalResult;
  } catch (e) {
    return [];
  }
};

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(JSON.stringify(result, null, 2));

console.log("Question 2");
// // refactoring old code // //
const csv = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Cook,19\n63,Blaine,Master,58\n98,Bill,Assistant,26";

// // storing 2d array values // //
let table = [];
let row = [];
let cell = "";

for (let i = 0; i < csv.length; i++) {
  const char = csv[i];

  if (char === ",") {
    row.push(cell);
    cell = "";
  } else if (char === "\n") {
    row.push(cell);
    table.push(row);
    row = [];
    cell = "";
  } else {
    cell += char;
  }
}
if (cell.length > 0) {
  row.push(cell);
  table.push(row);
}
for (let row of table) {
  console.log(row);
}
