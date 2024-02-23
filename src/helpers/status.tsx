//Status patient color
export const getStatusPatientColor = (
  status: string
): { color: 'blue' | 'yellow' | 'green' | 'red'; text: string } => {
  switch (status) {
    case 'in process':
      return { color: 'yellow', text: 'กำลังรักษา' };
    case 'rejected':
      return { color: 'red', text: 'ยกเลิกการรักษา' };
    case 'success':
      return { color: 'green', text: 'รักษาแล้ว' };
    default:
      return { color: 'blue', text: status };
  }
};


//Status Daily Challenege
export const getStatusChallengeColor = (
  status: string | undefined
): { color: 'blue' | 'green' | 'red'; text: string } => {
  if (!status) {
    // If status is undefined, return a default value
    return { color: 'blue', text: 'Unknown' };
  }

  switch (status) {
    case 'inactive':
      return { color: 'red', text: 'ปิดใช้งาน' };
    case 'active':
      return { color: 'green', text: 'เปิดใช้งาน' };
    default:
      return { color: 'blue', text: status };
  }
};
