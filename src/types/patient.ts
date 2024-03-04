//Get profile otherprofile

import { IUserData } from '@/types/user';

//http://localhost:8000/api/user/profile/patient/9c11398f-f3b9-4a8a-af76-b59a07cc59e1
export interface IPatientData {
  id: string;
  hn: string;
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  gender: string;
  status: string;
  mainDoctorID: string;
  mainDoctor?: IUserData;
  assistanceDoctorID?: string;
  assistanceDoctor?: IUserData;
  diseaseRisk?: IDiseaseRisk;
  disease?: string;
  planID?: string[];
  Plan?: IPlan[];
}
export interface IGetProfilePatientData {
  id: string;
  hn: string;
  firstName: string;
  lastName: string;
  gender: string;
  yearOfBirth: number;
  status: string;
  mainDoctorID: string;
}

//All Patient
export interface IGetProfilePatientAllApi {
  data: {
    users: IGetProfilePatientData[];
  };
  status: string;
}

//Only Patient By ID
export interface IGetProfilePatientIdApi {
  data: {
    user: IPatientData;
  };
  status: string;
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
