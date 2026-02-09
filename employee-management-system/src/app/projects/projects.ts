import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  userProjects: any[] = [];
  userId = '';
  selectedProject ?: any;

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem('currentUser') || '');
    this.userId = user.id;

    this.userProjects = this.getUserProjects(this.userId);
  }

  getUserProjects(userId:any){
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    return projects.filter((p:any) => p.uid === userId);
  }

  selectProject(project:any){
    this.selectedProject = project;
  }

}
