//Record Health
export interface IPatientData {
  id: string;
  hn: string;
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  gender: number;
  status: string;
  mainDoctorID: string;
  mainDoctor: {
    id: string;
    prefix: string;
    firstName: string;
    lastName: string;
  };
  assistanceDoctorID?: string;
  assistanceDoctor?: {
    id: string;
    prefix: string;
    firstName: string;
    lastName: string;
  };
  diseaseRisk?: IDiseaseRisk;
  disease?: string;
  planID?: string[];
  Plan?: IPlan[];
}

// ------------------------------------------- //
// Disease Risk
export interface IDiseaseRisk {
  id: string;
  diseaseRisk: {
    diabetes: string;
    hyperlipidemia: string;
    hypertension: string;
    obesity: string;
  };
}

//4 Disease type
export enum DiseaseType {
  diabetes = 'diabetes',
  hyperlipidemia = 'hyperlipidemia',
  hypertension = 'hypertension',
  obesity = 'obesity',
  metabolicLow = 'metabolicLow',
}

// Show Plan in Patient
export interface IPlan {
  id: string;
  name: string;
  description: string;
  photo: string;
  type: string;
  detail: {
    name: string[];
    day: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------- //
//Selected Type Record Health
export enum HealthRecordType {
  BMI = 'BMI',
  BloodPressure = 'BloodPressure',
  BloodGlucose = 'BloodGlucose',
  Cholesterol = 'Cholesterol',
}

//Record Health
export interface IRecordHealthData {
  id: string;
  height: number;
  weight: number;
  bmi: number;
  waistline: number;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  pulseRate: number;
  bloodGlucose: number;
  cholesterol: number;
  hdl: number;
  ldl: number;
  triglyceride: number;
  recordBy: string;
  timestamp: string;
}

//All record
export interface IGetRecordHealthAll {
  data: {
    record: IRecordHealthData[];
  };
  status: string;
}

//1 record
export interface IGetRecordHealthIdApi {
  data: {
    record: IRecordHealthData;
  };
  status: string;
}
