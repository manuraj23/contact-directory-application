import { Component } from '@angular/core';
import { BookingConstant } from '../core/constant/bookingConstant';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  menus: any = [];
  filteredMenu: any = [];
  role: string = '';

  constructor(){
    this.menus = BookingConstant.menus;
    const userData = localStorage.getItem('currentUser');
    if(userData != null){
      const userObj = JSON.parse(userData);
      this.role = userObj.role;
    }

    this.menus.forEach((element:any) => {
      const isRolePresent = element.role.find((r: any)=> r === this.role);
      if(isRolePresent != undefined){
        this.filteredMenu.push(element);
    }
    });
  }

}
