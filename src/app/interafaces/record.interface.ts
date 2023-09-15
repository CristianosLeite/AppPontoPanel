export interface Record {
  recordId: string;
  companyId: string;
  userId: string;
  employee: string;
  date: string;
  records: [{ [key: string]: number}];
  workedHours?: string;
}
