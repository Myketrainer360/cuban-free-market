import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LoadingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  profileForm!: FormGroup;
  loading = false;
  successMessage = '';

  user = this.authService.user;

  ngOnInit(): void {
    const currentUser = this.authService.getUser();

    if (!currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.profileForm = this.fb.group({
      firstName: [currentUser.firstName, [Validators.required]],
      lastName: [currentUser.lastName, [Validators.required]],
      email: [currentUser.email, [Validators.required, Validators.email]],
      avatar: [currentUser.avatar]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.successMessage = '';

      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }
}
