export interface Wfh {
  id: number;
  username: string;
  date: string; 
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
