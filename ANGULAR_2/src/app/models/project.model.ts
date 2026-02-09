export interface Project {
  id: number;          // unique ID for editing/updating
  username: string;    // which user owns this project
  name: string;        // project name
  description?: string;// optional
  status: 'Not Started' | 'In Progress' | 'Done';
}
