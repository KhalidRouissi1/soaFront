import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  editUserId: number | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  createUser() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;

      if (this.editUserId !== null) {
        this.userService.updateUser(this.editUserId, newUser).subscribe(
          (user) => {
            const index = this.users.findIndex(u => u.id === this.editUserId);
            if (index !== -1) {
              this.users[index] = user;
            }
            this.resetForm();
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        this.userService.createUser(newUser).subscribe(
          (user) => {
            this.users.push(user);
            this.resetForm();
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      }
    }
  }

  editUser(user: User) {
    this.editUserId = user.id || null;
    this.userForm.patchValue(user);
  }

  deleteUser(user: User) {
    if (user.id !== undefined) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.error('Cannot delete user without an ID');
    }
  }

  resetForm() {
    this.userForm.reset();
    this.editUserId = null;
  }
}
