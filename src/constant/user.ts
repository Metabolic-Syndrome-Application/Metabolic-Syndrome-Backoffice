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
  { label: 'แผนกผู้ป่วยนอก', value: 'แผนกผู้ป่วยนอก' },
  { label: 'แผนกอุบัติเหตุและฉุกเฉิน ', value: 'แผนกอุบัติเหตุและฉุกเฉิน ' },
  { label: 'แผนกผู้ป่วยใน', value: 'แผนกผู้ป่วยใน' },
  {
    label: 'หอผู้ป่วยหนัก หรือ หออภิบาล',
    value: 'หอผู้ป่วยหนัก หรือ หออภิบาล',
  },
  { label: 'แผนกเวชกรรมฟื้นฟู', value: 'แผนกเวชกรรมฟื้นฟู' },
  { label: 'แผนกทันตกรรม', value: 'แผนกทันตกรรม' },
  { label: 'แผนกเภสัชกรรม', value: 'แผนกเภสัชกรรม' },
  { label: 'แผนกรังสีวิทยา', value: 'แผนกรังสีวิทยา' },
  { label: 'แผนกโลหิตวิทยา', value: 'แผนกโลหิตวิทยา' },
  {
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
  { label: 'แพทย์ทั่วไป', value: 'แพทย์ทั่วไป' },
  { label: 'อายุรกรรม', value: 'อายุรกรรม' },
  { label: 'กุมารเวชศาสตร์', value: 'กุมารเวชศาสตร์' },
  { label: 'สูตินรีเวชวิทยา', value: 'สูตินรีเวชวิทยา' },
  { label: 'ศัลยกรรม', value: 'ศัลยกรรม' },
  { label: 'ตจวิทยา', value: 'ตจวิทยา' },
  { label: 'วิสัญญีวิทยา', value: 'วิสัญญีวิทยา' },
  { label: 'โสต ศอ นาสิก', value: 'โสต ศอ นาสิก' },
  { label: 'รังสีวิทยา', value: 'รังสีวิทยา' },
  {
    label: 'จิตเวชศาสตร์',
    value: 'จิตเวชศาสตร์',
  },
  { label: 'มะเร็งวิทยา', value: 'มะเร็งวิทยา' },
];

//Radio Button Options
const dataOptions = {
  roleOptions: [
    { label: 'หมอ', value: 'doctor' },
    { label: 'พยาบาล', value: 'staff' },
  ],
  accountOptions: [
    { label: 'ยังไม่เคยบัญชี', value: 'noAccount' },
    { label: 'มีบัญชีแล้ว', value: 'haveAccount' },
  ],
  genderOptions: [
    { label: 'ชาย', value: 'male' },
    { label: 'หญิง', value: 'female' },
  ],
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
