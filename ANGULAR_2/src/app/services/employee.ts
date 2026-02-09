import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
constructor() {
  this.initializeAttendance();
  this.initializeLeaves();
  this.initializeWfh();

  if (!localStorage.getItem('personalDetails')) {
    localStorage.setItem('personalDetails', JSON.stringify([]));
  }
}


  /*
    This function runs once and seeds dummy attendance data
    if it does not already exist in localStorage
  */
  private initializeAttendance(): void {
    const existingAttendance = localStorage.getItem('attendance');

    if (!existingAttendance) {
      const attendanceData = [
        {
          username: 'Amrita',
          records: [
            { date: '2025-06-10', status: 'Present' },
            { date: '2025-06-11', status: 'Present' },
            { date: '2025-06-12', status: 'WFH' },
            { date: '2025-06-13', status: 'Absent' }
          ]
        },
        {
          username: 'Sagar',
          records: [
            { date: '2025-06-10', status: 'Present' },
            { date: '2025-06-11', status: 'Absent'},
             { date: '2025-06-12', status: 'Present' },
               { date: '2025-06-13', status: 'Present' },
             
          ]
        }
      ];

      localStorage.setItem('attendance', JSON.stringify(attendanceData));
    }
  }

  /*
    Returns attendance records for the currently logged-in user
  */
  getUserAttendance(username: string) {
    const attendanceData = JSON.parse(
      localStorage.getItem('attendance') || '[]'
    );

    const userAttendance = attendanceData.find(
      (a: any) => a.username === username
    );

    return userAttendance ? userAttendance.records : [];
  }
  /*
  Initialize leave data if not present
*/
private initializeLeaves(): void {
  const existingLeaves = localStorage.getItem('leaves');

  if (!existingLeaves) {
    localStorage.setItem('leaves', JSON.stringify([]));
  }
}

/*
  Get leaves for a specific user
*/
getUserLeaves(username: string) {
  const leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  return leaves.filter((l: any) => l.username === username);
}

/*
  Apply for a new leave
*/
applyLeave(leave: any) {
  const leaves = JSON.parse(localStorage.getItem('leaves') || '[]');

  leave.id = Date.now(); // simple unique id
  leave.status = 'Pending';

  leaves.push(leave);
  localStorage.setItem('leaves', JSON.stringify(leaves));
}

/*
  Cancel leave (only pending ones logically)
*/
cancelLeave(id: number) {
  let leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  leaves = leaves.filter((l: any) => l.id !== id);
  localStorage.setItem('leaves', JSON.stringify(leaves));
}
/*
  Initialize WFH data if not present
*/
private initializeWfh(): void {
  const existingWfh = localStorage.getItem('wfh');

  if (!existingWfh) {
    localStorage.setItem('wfh', JSON.stringify([]));
  }
}

/*
  Get WFH requests for a user
*/
getUserWfh(username: string) {
  const wfh = JSON.parse(localStorage.getItem('wfh') || '[]');
  return wfh.filter((w: any) => w.username === username);
}

/*
  Apply WFH
*/
applyWfh(request: any) {
  const wfh = JSON.parse(localStorage.getItem('wfh') || '[]');

  request.id = Date.now();
  request.status = 'Pending';

  wfh.push(request);
  localStorage.setItem('wfh', JSON.stringify(wfh));
}

/*
  Cancel WFH
*/
cancelWfh(id: number) {
  let wfh = JSON.parse(localStorage.getItem('wfh') || '[]');
  wfh = wfh.filter((w: any) => w.id !== id);
  localStorage.setItem('wfh', JSON.stringify(wfh));
}
/* ---------- HR LEAVES ---------- */

getAllLeaves() {
  return JSON.parse(localStorage.getItem('leaves') || '[]');
}

updateLeaveStatus(id: number, status: 'Approved' | 'Rejected') {
  const leaves = JSON.parse(localStorage.getItem('leaves') || '[]');

  const index = leaves.findIndex((l: any) => l.id === id);
  if (index !== -1) {
    leaves[index].status = status;
    localStorage.setItem('leaves', JSON.stringify(leaves));
  }
}

/* ---------- HR WFH ---------- */

getAllWfh() {
  return JSON.parse(localStorage.getItem('wfh') || '[]');
}

updateWfhStatus(id: number, status: 'Approved' | 'Rejected') {
  const wfh = JSON.parse(localStorage.getItem('wfh') || '[]');

  const index = wfh.findIndex((w: any) => w.id === id);
  if (index !== -1) {
    wfh[index].status = status;
    localStorage.setItem('wfh', JSON.stringify(wfh));
  }
}
/* ---------- PERSONAL DETAILS ---------- */

getPersonalDetails(username: string) {
  const details = JSON.parse(
    localStorage.getItem('personalDetails') || '[]'
  );

  return details.find((d: any) => d.username === username);
}

savePersonalDetails(data: any) {
  let details = JSON.parse(
    localStorage.getItem('personalDetails') || '[]'
  );

  const index = details.findIndex(
    (d: any) => d.username === data.username
  );

  if (index !== -1) {
    details[index] = data; // update
  } else {
    details.push(data); // create
  }

  localStorage.setItem('personalDetails', JSON.stringify(details));
}
/* ---------- PROJECTS ---------- */

getUserProjects(username: string) {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  return projects.filter((p: any) => p.username === username);
}

addOrUpdateProject(project: Project) {
  let projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const index = projects.findIndex((p: any) => p.id === project.id);

  if (index !== -1) {
    projects[index] = project; // update existing
  } else {
    projects.push(project); // add new
  }

  localStorage.setItem('projects', JSON.stringify(projects));
}

deleteProject(id: number) {
  let projects = JSON.parse(localStorage.getItem('projects') || '[]');
  projects = projects.filter((p: any) => p.id !== id);
  localStorage.setItem('projects', JSON.stringify(projects));
}


}
