import { Routes } from '@angular/router';
import { Login } from './login/login';
import { LeaveWfhApplication } from './leave-wfh-application/leave-wfh-application';
import { Projects } from './projects/projects';
import { Profile } from './profile/profile';
import { Requests } from './requests/requests';
import { Dashboard } from './dashboard/dashboard';
import { Attendance } from './attendance/attendance';

export const routes: Routes = [
    {path:"", redirectTo: "login", pathMatch: "full"},
    {path:"login", component: Login},
    {
        path: "",
        component: Dashboard,
        children: [
            {path:"attendance", component:Attendance},
            {path:"leave-wfh", component: LeaveWfhApplication},
            {path: "projects", component: Projects},
            {path: "profile", component:Profile},
            {path: "requests", component: Requests},
        ]
    }
];
