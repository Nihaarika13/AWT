import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { profileService } from './app.component.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  users: any[] = [];
  selectedUser: any = null;
  newUser: any = { id: null, name: '', branch: '' };

  constructor(private profileService: profileService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.users = this.profileService.getUser();
  }

  addUser(newUser: any) {
    this.profileService.addUser(newUser);
    this.newUser = { id: null, name: '', branch: '' };
    this.fetchUsers();
  }

  deleteUser(id: any) {
    this.profileService.deleteUser(id);
    this.fetchUsers();
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  updateUser(selectedUser: any) {
    this.profileService.updateUser(selectedUser);
    this.fetchUsers();
    this.selectedUser = null;
  }
}
