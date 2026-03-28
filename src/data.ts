import { Topic } from "./types";

export const topics: Topic[] = [
  {
    id: "arithmetic-operations",
    title: "Basic Arithmetic Operations",
    description: "Master Basic Math • 4 Interactive Lessons • Comprehensive Quizzes",
    sections: [
      {
        id: 1,
        title: "Addition of Whole Numbers",
        content: "Adding whole numbers to find the sum.",
        concepts: [
          "Addition combines two or more numbers to get a total.",
          "The result is called the sum.",
          "You can add numbers in any order (commutative property).",
          "Adding 0 to any number gives the same number.",
        ],
        examples: [
          {
            heading: "Example 1: Simple Addition",
            text: `2 + 3 = 5
This is read as "two plus three equals five".`,
          },
          {
            heading: "Example 2: Adding Larger Numbers",
            text: `47 + 28 = 75
Line up the numbers by place value:
  47
+ 28
-----
  75`,
          },
          {
            heading: "Example 3: Adding Multiple Numbers",
            text: `5 + 2 + 8 = 15
You can add them step by step: 5 + 2 = 7, then 7 + 8 = 15.`,
          },
        ],
      },
      {
        id: 2,
        title: "Subtraction of Whole Numbers",
        content: "Subtracting whole numbers to find the difference.",
        concepts: [
          "Subtraction finds how much is left after taking away.",
          "The result is called the difference.",
          "You can only subtract a smaller number from a larger one.",
          "Subtracting 0 from any number gives the same number.",
        ],
        examples: [
          {
            heading: "Example 1: Simple Subtraction",
            text: `5 - 3 = 2
This is read as "five minus three equals two".`,
          },
          {
            heading: "Example 2: Subtracting Larger Numbers",
            text: `75 - 28 = 47
Line up the numbers:
  75
- 28
-----
  47`,
          },
          {
            heading: "Example 3: Borrowing in Subtraction",
            text: `52 - 27 = 25
  5 2
- 2 7
Borrow 1 from 5: 4 12
- 2 7
-----
  2 5`,
          },
        ],
      },
      {
        id: 3,
        title: "Multiplication of Whole Numbers",
        content: "Multiplying whole numbers to find the product.",
        concepts: [
          "Multiplication is repeated addition.",
          "The result is called the product.",
          "Multiplication by 1 gives the same number.",
          "Multiplication by 0 gives 0.",
        ],
        examples: [
          {
            heading: "Example 1: Simple Multiplication",
            text: `2 × 3 = 6
This means 2 groups of 3, or 3 + 3 = 6.`,
          },
          {
            heading: "Example 2: Multiplying Larger Numbers",
            text: `12 × 5 = 60
You can think of it as 12 + 12 + 12 + 12 + 12 = 60.`,
          },
          {
            heading: "Example 3: Multiplication Table",
            text: `Using the multiplication table:
3 × 4 = 12
4 × 3 = 12 (commutative property)`,
          },
        ],
      },
      {
        id: 4,
        title: "Division of Whole Numbers",
        content: "Dividing whole numbers to find the quotient.",
        concepts: [
          "Division splits a number into equal parts.",
          "The result is called the quotient.",
          "Division by 1 gives the same number.",
          "Division by 0 is undefined.",
        ],
        examples: [
          {
            heading: "Example 1: Simple Division",
            text: `6 ÷ 2 = 3
This means 6 divided into 2 equal groups gives 3 in each group.`,
          },
          {
            heading: "Example 2: Division with Remainder",
            text: `13 ÷ 3 = 4 remainder 1
Because 3 × 4 = 12, and 13 - 12 = 1.`,
          },
          {
            heading: "Example 3: Checking Division",
            text: `18 ÷ 3 = 6
Check: 3 × 6 = 18.`,
          },
        ],
      },
    ],
    quizzes: [
      // Addition Quizzes
      {
        id: "quiz-1",
        sectionId: 1,
        question: "What is 7 + 5?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
        explanation: "7 + 5 = 12",
      },
      {
        id: "quiz-2",
        sectionId: 1,
        question: "What is 15 + 8?",
        options: ["22", "23", "24", "25"],
        correctAnswer: 1,
        explanation: "15 + 8 = 23",
      },
      {
        id: "quiz-3",
        sectionId: 1,
        question: "What is the sum of 9, 4, and 7?",
        options: ["18", "19", "20", "21"],
        correctAnswer: 2,
        explanation: "9 + 4 = 13, 13 + 7 = 20",
      },
      {
        id: "quiz-4",
        sectionId: 1,
        question: "Which property allows us to add numbers in any order?",
        options: ["Associative", "Commutative", "Distributive", "Identity"],
        correctAnswer: 1,
        explanation: "The commutative property of addition.",
      },
      {
        id: "quiz-5",
        sectionId: 1,
        question: "What is 0 + 12?",
        options: ["0", "12", "24", "1"],
        correctAnswer: 1,
        explanation: "Adding 0 gives the same number.",
      },
      // Subtraction Quizzes
      {
        id: "quiz-6",
        sectionId: 2,
        question: "What is 10 - 4?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
        explanation: "10 - 4 = 6",
      },
      {
        id: "quiz-7",
        sectionId: 2,
        question: "What is 25 - 17?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
        explanation: "25 - 17 = 8",
      },
      {
        id: "quiz-8",
        sectionId: 2,
        question: "What is 50 - 28?",
        options: ["20", "21", "22", "23"],
        correctAnswer: 2,
        explanation: "50 - 28 = 22",
      },
      {
        id: "quiz-9",
        sectionId: 2,
        question: "What is the result called in subtraction?",
        options: ["Sum", "Difference", "Product", "Quotient"],
        correctAnswer: 1,
        explanation: "The difference.",
      },
      {
        id: "quiz-10",
        sectionId: 2,
        question: "What is 15 - 0?",
        options: ["0", "15", "30", "1"],
        correctAnswer: 1,
        explanation: "Subtracting 0 gives the same number.",
      },
      // Multiplication Quizzes
      {
        id: "quiz-11",
        sectionId: 3,
        question: "What is 3 × 4?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
        explanation: "3 × 4 = 12",
      },
      {
        id: "quiz-12",
        sectionId: 3,
        question: "What is 7 × 6?",
        options: ["40", "41", "42", "43"],
        correctAnswer: 2,
        explanation: "7 × 6 = 42",
      },
      {
        id: "quiz-13",
        sectionId: 3,
        question: "What is 0 × 8?",
        options: ["0", "8", "16", "1"],
        correctAnswer: 0,
        explanation: "Any number multiplied by 0 is 0.",
      },
      {
        id: "quiz-14",
        sectionId: 3,
        question: "What is 5 × 1?",
        options: ["0", "1", "5", "6"],
        correctAnswer: 2,
        explanation: "Multiplying by 1 gives the same number.",
      },
      {
        id: "quiz-15",
        sectionId: 3,
        question: "What is multiplication also known as?",
        options: ["Repeated subtraction", "Repeated addition", "Repeated division", "Repeated multiplication"],
        correctAnswer: 1,
        explanation: "Multiplication is repeated addition.",
      },
      // Division Quizzes
      {
        id: "quiz-16",
        sectionId: 4,
        question: "What is 12 ÷ 3?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "12 ÷ 3 = 4",
      },
      {
        id: "quiz-17",
        sectionId: 4,
        question: "What is 20 ÷ 4?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "20 ÷ 4 = 5",
      },
      {
        id: "quiz-18",
        sectionId: 4,
        question: "What is 15 ÷ 2?",
        options: ["7", "7 remainder 1", "8", "6"],
        correctAnswer: 1,
        explanation: "15 ÷ 2 = 7 remainder 1",
      },
      {
        id: "quiz-19",
        sectionId: 4,
        question: "What is the result called in division?",
        options: ["Sum", "Difference", "Product", "Quotient"],
        correctAnswer: 3,
        explanation: "The quotient.",
      },
      {
        id: "quiz-20",
        sectionId: 4,
        question: "What is 10 ÷ 1?",
        options: ["0", "1", "10", "11"],
        correctAnswer: 2,
        explanation: "Dividing by 1 gives the same number.",
      },
    ],
  },
];
