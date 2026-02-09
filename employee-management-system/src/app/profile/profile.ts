import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profile: any
  isEditMode = false;

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.profile = this.getProfile(user.id);
  }

  getProfile(id:any){
    const employees = JSON.parse(localStorage.getItem('profile') || '[]');
    return employees.find((e:any) => e.id === id); 
  }

  updateProfile(updatedProfile: any){
    const employees = JSON.parse(localStorage.getItem('profile') || '[]');

    const index = employees.findIndex(
      (e:any) => e.userId === updatedProfile.id
    );

    if(index > -1){
      employees[index] = updatedProfile;
      localStorage.setItem('profile', JSON.stringify(employees));
    }
  }

  edit(){
    this.isEditMode = true;
  }

  save(){
    this.updateProfile(this.profile);
    this.isEditMode = false;
    alert('Profile updated successfully');
  }

  cancel(){
    this.ngOnInit();
    this.isEditMode = false;
  }

}
