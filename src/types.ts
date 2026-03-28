export interface Example {
  heading: string;
  text: string;
}

export interface Section {
  id: number;
  title: string;
  content: string;
  concepts: string[];
  examples: Example[];
}

export interface Quiz {
  id: string;
  sectionId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  quizzes: Quiz[];
}

export interface QuizSession {
  topicId: string;
  questions: Quiz[];
  currentIndex: number;
  answers: { [key: string]: number };
}

export interface QuizResult {
  topicId: string;
  topicTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  details: {
    quiz: Quiz;
    userAnswer: number;
    isCorrect: boolean;
  }[];
}

