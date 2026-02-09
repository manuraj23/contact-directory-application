export interface Leave {
  id: number;
  username: string;
  fromDate: string; 
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
