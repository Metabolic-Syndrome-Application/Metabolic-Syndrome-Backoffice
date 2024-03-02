import { generateBirthYear } from '@/helpers/date';

import { IGetDoctorOptions } from '@/types/user';

const personalInfoQuestions = {
  question1: {
    id: 1,
    question: 'คำนำหน้า',
  },
  question2: {
    id: 2,
    question: 'ชื่อ - สกุล',
  },
};

//Select Dropdown จัดการข้อมูลแพทย์ - แผนก + ความเชี่ยวชาญ
const medicalDepartment = [
  { id: 1, label: 'แผนกผู้ป่วยนอก', value: 'แผนกผู้ป่วยนอก' },
  {
    id: 2,
    label: 'แผนกอุบัติเหตุและฉุกเฉิน ',
    value: 'แผนกอุบัติเหตุและฉุกเฉิน ',
  },
  { id: 3, label: 'แผนกผู้ป่วยใน', value: 'แผนกผู้ป่วยใน' },
  {
    id: 4,
    label: 'หอผู้ป่วยหนัก หรือ หออภิบาล',
    value: 'หอผู้ป่วยหนัก หรือ หออภิบาล',
  },
  { id: 5, label: 'แผนกเวชกรรมฟื้นฟู', value: 'แผนกเวชกรรมฟื้นฟู' },
  { id: 6, label: 'แผนกทันตกรรม', value: 'แผนกทันตกรรม' },
  { id: 7, label: 'แผนกเภสัชกรรม', value: 'แผนกเภสัชกรรม' },
  { id: 8, label: 'แผนกรังสีวิทยา', value: 'แผนกรังสีวิทยา' },
  { id: 9, label: 'แผนกโลหิตวิทยา', value: 'แผนกโลหิตวิทยา' },
  {
    id: 10,
    label: 'ห้องผ่าตัด',
    value: 'ห้องผ่าตัด',
  },
];

// const medicalDepartment = [
//   { label: 'แพทย์กระดูก', value: 'แพทย์กระดูก' },
//   { label: 'กุมารเวชศาสตร์', value: 'กุมารเวชศาสตร์' },
//   { label: 'ศัลยแพทย์ทั่วไป', value: 'ศัลยแพทย์ทั่วไป' },
//   { label: 'วิสัญญีแพทย์', value: 'วิสัญญีแพทย์' },
//   { label: 'นิติเวชศาสตร์', value: 'นิติเวชศาสตร์' },
//   { label: 'สูตินารีแพทย์', value: 'สูตินารีแพทย์' },
//   { label: 'แพทย์ระบบทางเดินปัสสาวะ', value: 'แพทย์ระบบทางเดินปัสสาวะ' },
//   { label: 'ศัลยแพทย์ช่องปาก', value: 'ศัลยแพทย์ช่องปาก' },
//   { label: 'รังสีแพทย์', value: 'รังสีแพทย์' },
//   {
//     label: 'แพทย์เฉพาะทางด้านตา หู คอ จมูก',
//     value: 'แพทย์เฉพาะทางด้านตา หู คอ จมูก',
//   },
//   { label: 'ศัลยกรรมตกแต่ง', value: 'ศัลยกรรมตกแต่ง' },
// ];

const medicalSpecialist = [
  { id: 1, label: 'แพทย์ทั่วไป', value: 'แพทย์ทั่วไป' },
  { id: 2, label: 'อายุรกรรม', value: 'อายุรกรรม' },
  { id: 3, label: 'กุมารเวชศาสตร์', value: 'กุมารเวชศาสตร์' },
  { id: 4, label: 'สูตินรีเวชวิทยา', value: 'สูตินรีเวชวิทยา' },
  { id: 5, label: 'ศัลยกรรม', value: 'ศัลยกรรม' },
  { id: 6, label: 'ตจวิทยา', value: 'ตจวิทยา' },
  { id: 7, label: 'วิสัญญีวิทยา', value: 'วิสัญญีวิทยา' },
  { id: 8, label: 'โสต ศอ นาสิก', value: 'โสต ศอ นาสิก' },
  { id: 9, label: 'รังสีวิทยา', value: 'รังสีวิทยา' },
  {
    id: 10,
    label: 'จิตเวชศาสตร์',
    value: 'จิตเวชศาสตร์',
  },
  { id: 11, label: 'มะเร็งวิทยา', value: 'มะเร็งวิทยา' },
];

//Radio Button Options
const dataOptions = {
  roleOptions: [
    { id: 1, label: 'หมอ', value: 'doctor' },
    { id: 2, label: 'พยาบาล', value: 'staff' },
  ],
  accountOptions: [
    { id: 1, label: 'ยังไม่เคยบัญชี', value: 'noAccount' },
    { id: 2, label: 'มีบัญชีแล้ว', value: 'haveAccount' },
  ],
  genderOptions: [
    { id: 1, label: 'ชาย', value: 'male' },
    { id: 2, label: 'หญิง', value: 'female' },
  ],
  patientOption: [{ id: 1, label: 'คนไข้', value: 'patient' }],
};

const yearOptions = generateBirthYear();

//Get All Doctor Options
const getDoctorOptions = (options: IGetDoctorOptions[]) => {
  return options.map((option) => ({
    label: `${option.prefix}${option.firstName} ${option.lastName}`,
    value: option.id,
  }));
};

export {
  dataOptions,
  getDoctorOptions,
  medicalDepartment,
  medicalSpecialist,
  personalInfoQuestions,
  yearOptions,
};
