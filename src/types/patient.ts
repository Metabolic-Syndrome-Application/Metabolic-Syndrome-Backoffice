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
    prefix: string;
    firstName: string;
    lastName: string;
  };
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
