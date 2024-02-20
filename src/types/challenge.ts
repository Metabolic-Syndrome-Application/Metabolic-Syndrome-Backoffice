export type IQuizChallengeData = {
  id: string;
  question: string;
  points?: number;
  limitTime?: number;
  choices: IChoicesQuiz[];
  date?: string;
};

export type IChoicesQuiz = {
  option: string;
  isCorrect: boolean;
};

//All Quiz
export interface IGetQuizAllApi {
  data: {
    quiz: IQuizChallengeData[];
  };
  status: string;
}

//Only 1 Quiz
export interface IGetQuizIdApi {
  data: {
    quiz: IQuizChallengeData;
  };
  status: string;
}
