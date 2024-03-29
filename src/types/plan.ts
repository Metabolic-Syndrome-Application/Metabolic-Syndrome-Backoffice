//plan
export interface IPlanData {
  id: string;
  name: string;
  type: string;
  description: string;
  photo?: string;
  detail: {
    name: string[];
    day: string[];
  };
  date?: string;
}

//get plan  optons all
export interface IGetPlanAllOptions {
  id: string;
  name: string;
  type: string;
}

//All Plan
export interface IGetPlanAllApi {
  data: {
    plan: IPlanData[];
  };
  status: string;
}

//1 Plan
export interface IGetPlanIdApi {
  data: {
    plan: IPlanData;
  };
  status: string;
}
