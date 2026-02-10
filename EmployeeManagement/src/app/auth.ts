import { Injectable, signal } from '@angular/core';

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  dob: string;
  gender: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyName: string;
  emergencyMobile: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {

  private usersSignal = signal<UserModel[]>(this.loadUsers());

  private loadUsers(): UserModel[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  private saveUsers(users: UserModel[]) {
    localStorage.setItem('users', JSON.stringify(users));
    this.usersSignal.set(users);
  }

  getUsers() {
    return this.usersSignal();
  }

  signupUser(user: UserModel): string {
    const users = this.getUsers();

    if (users.find(u => u.email === user.email)) {
      return 'Email already registered';
    }

    users.push(user);
    this.saveUsers(users);
    return 'Signup successful';
  }

  loginUser(role: string, email: string, password: string): string {

    if (role === 'hr') {
      if (email === '' && password === '') {
        localStorage.setItem('currentUser', JSON.stringify({ email, role }));
        return 'hr';
      }
      return 'Invalid HR credentials';
    }

    const user = this.getUsers()
      .find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return 'employee';
    }

    return 'Invalid email or password';
  }

  deleteUser(email: string) {
  const users = this.getUsers().filter(u => u.email !== email);
  this.saveUsers(users);
}
}
