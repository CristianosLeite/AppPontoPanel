export interface Record {
  recordId: string;
  companyId: string;
  userId: string;
  employee: string;
  date: string;
  records: [{ [key: string]: number}];
  workedHours?: string;

  arrivedAt: string;
  leftAt: string;
  workedTime: string;
  extraHours: string;
  missingHours: string;
  balance: string;
}
