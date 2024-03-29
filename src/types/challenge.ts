//Quiz Challenege
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

// ======================================================= //

//Daily Challenge
export type IDailyChallengeData = {
  id: string;
  name: string;
  numDays: number;
  points: number;
  description: string;
  photo?: string;
  detail: {
    name: string[];
    day: string[];
  };
  status?: string;
  participants?: number;
};

//All Quiz
export interface IGetDailyChallengeAllApi {
  data: {
    daily: IDailyChallengeData[];
  };
  status: string;
}

//Only 1 Quiz
export interface IGetDailyChallengeIdApi {
  data: {
    daily: IDailyChallengeData;
  };
  status: string;
}
