import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  roleForm: FormGroup;
  editRoleId: number | null = null;

  constructor(private roleService: RoleService, private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles() {
    this.roleService.getAllRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

  createRole() {
    if (this.roleForm.valid) {
      const newRole: Role = this.roleForm.value;

      if (this.editRoleId !== null) {
        this.roleService.updateRole(this.editRoleId, newRole).subscribe(
          (role) => {
            const index = this.roles.findIndex(r => r.id === this.editRoleId);
            if (index !== -1) {
              this.roles[index] = role;
            }
            this.resetForm();
          },
          (error) => {
            console.error('Error updating role:', error);
          }
        );
      } else {
        this.roleService.createRole(newRole).subscribe(
          (role) => {
            this.roles.push(role);
            this.resetForm();
          },
          (error) => {
            console.error('Error creating role:', error);
          }
        );
      }
    }
  }

  editRole(role: Role) {
    this.editRoleId = role.id || null;
    this.roleForm.patchValue(role);
  }

  deleteRole(role: Role) {
    if (role.id !== undefined) {
      this.roleService.deleteRole(role.id).subscribe(
        () => {
          this.roles = this.roles.filter(r => r.id !== role.id);
        },
        (error) => {
          console.error('Error deleting role:', error);
        }
      );
    } else {
      console.error('Cannot delete role without an ID');
    }
  }

  resetForm() {
    this.roleForm.reset();
    this.editRoleId = null;
  }
}
