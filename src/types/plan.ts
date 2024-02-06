//plan
export interface IPlanData {
  id: string;
  name: string;
  type: string;
  description?: string;
  photo?: string;
  detail?: string[];
}

//All Plan
export interface IGetPlanAllApi {
  data: {
    plan: IPlanData[];
  };
  status: string;
}
