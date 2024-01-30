//Status patient color
export const getStatusColor = (
  status: string
): { color: 'blue' | 'yellow' | 'green' | 'red'; text: string } => {
  switch (status) {
    case 'pending':
      return { color: 'yellow', text: 'กำลังรักษา' };
    case 'rejected':
      return { color: 'red', text: 'ยกเลิกการรักษา' };
    case 'success':
      return { color: 'green', text: 'รักษาแล้ว' };
    default:
      return { color: 'blue', text: status };
  }
};
