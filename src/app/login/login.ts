import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-page">
      <div class="login-header">
        <span class="header-text">Login</span>
      </div>

      <div class="login-content">
        <!-- Background Blob -->
        <div class="background-gradient">
          <div class="blob"></div>
        </div>

        <!-- Left Side - Logo -->
        <div class="left-section">
          <div class="logo-container">
            <div class="logo-badge">RTA</div>
            <h1 class="logo-text">LAB PORTAL</h1>
          </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="right-section">
          <div class="login-box">
            <!-- Close Button -->
            <button mat-icon-button class="close-btn">
              <mat-icon>close</mat-icon>
            </button>

            <!-- Sign in Title -->
            <h2 class="signin-title">Sign in</h2>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <!-- Email Input -->
              <div class="form-group">
                <label class="input-label">Email</label>
                <mat-form-field appearance="outline" class="custom-input">
                  <input 
                    matInput 
                    type="email" 
                    formControlName="email"
                    placeholder="yasmineali@digital.com">
                </mat-form-field>
              </div>

              <!-- Password Input -->
              <div class="form-group">
                <label class="input-label">Password</label>
                <mat-form-field appearance="outline" class="custom-input">
                  <input 
                    matInput 
                    [type]="hidePassword ? 'password' : 'text'"
                    formControlName="password">
                  <button 
                    mat-icon-button 
                    matSuffix 
                    type="button"
                    (click)="hidePassword = !hidePassword">
                    <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                </mat-form-field>
              </div>

              <!-- Stay signed in & Forgot password -->
              <div class="form-footer">
                <mat-checkbox formControlName="staySignedIn" class="custom-checkbox">
                  Stay signed in
                </mat-checkbox>
                <a class="forgot-password" (click)="navigateToForgotPassword()">
                  Forgot password?
                </a>
              </div>

              <!-- Continue Button -->
              <button 
                mat-raised-button 
                type="submit"
                class="continue-btn"
                [disabled]="isLoading || loginForm.invalid">
                <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                <span *ngIf="!isLoading">Continue</span>
              </button>

              <!-- OR Divider -->
              <div class="divider-container">
                <span class="divider-text">OR</span>
              </div>

              <!-- UAE Pass Button -->
              <button 
                mat-stroked-button 
                type="button"
                class="uaepass-btn"
                (click)="signInWithUAEPass()">
                <mat-icon class="uae-icon">fingerprint</mat-icon>
                Sign in With UAE PASS
              </button>

              <!-- Request for access -->
              <div class="request-access">
                <a (click)="navigateToRegister()">Request for access</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .login-page {
      width: 100%;
      min-height: 100vh;
      background: #2a2a2a;
      position: relative;
    }

    .login-header {
      padding: 20px 40px;
      color: #888;
      font-size: 16px;
    }

    .login-content {
      position: relative;
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 100px;
      min-height: calc(100vh - 80px);
    }

    /* Background Gradient Blob */
    .background-gradient {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      pointer-events: none;
      z-index: 1;
    }

    .blob {
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at center,
        rgba(180, 58, 160, 0.6) 0%,
        rgba(120, 50, 180, 0.5) 30%,
        rgba(80, 40, 150, 0.3) 60%,
        transparent 100%
      );
      border-radius: 50%;
      filter: blur(60px);
      animation: blobFloat 15s ease-in-out infinite;
    }

    @keyframes blobFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.1); }
      66% { transform: translate(-30px, 30px) scale(0.95); }
    }

    /* Left Section - Logo */
    .left-section {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    .logo-container {
      text-align: center;
    }

    .logo-badge {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      font-weight: bold;
      font-size: 32px;
      padding: 15px 50px;
      display: inline-block;
      clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
      letter-spacing: 6px;
      margin-bottom: 25px;
      box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
    }

    .logo-text {
      color: white;
      font-size: 48px;
      font-weight: 700;
      letter-spacing: 4px;
      margin: 0;
    }

    /* Right Section - Login Form */
    .right-section {
      flex: 0 0 500px;
      z-index: 2;
    }

    .login-box {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.9) 0%,
        rgba(245, 245, 255, 0.85) 100%
      );
      backdrop-filter: blur(30px);
      border-radius: 30px;
      padding: 45px 40px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #666;
      background: rgba(255, 255, 255, 0.5);
    }

    .signin-title {
      font-size: 32px;
      font-weight: 600;
      color: #2a2a2a;
      margin: 0 0 30px 0;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .input-label {
      display: block;
      color: #555;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .custom-input {
      width: 100%;
      
      ::ng-deep {
        .mat-mdc-text-field-wrapper {
          background: rgba(255, 255, 255, 0.6);
        }
        
        .mat-mdc-form-field-focus-overlay {
          background: transparent;
        }

        .mdc-notched-outline__leading,
        .mdc-notched-outline__notch,
        .mdc-notched-outline__trailing {
          border-color: rgba(255, 255, 255, 0.4) !important;
        }

        .mat-mdc-form-field.mat-focused .mdc-notched-outline__leading,
        .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch,
        .mat-mdc-form-field.mat-focused .mdc-notched-outline__trailing {
          border-color: rgba(255, 255, 255, 0.6) !important;
        }

        input {
          color: #2a2a2a;
        }

        input::placeholder {
          color: #888;
        }
      }
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0 25px 0;
    }

    .custom-checkbox {
      ::ng-deep {
        .mdc-checkbox__background {
          background: rgba(255, 255, 255, 0.5);
        }
        
        .mdc-label {
          color: #555;
          font-size: 14px;
        }
      }
    }

    .forgot-password {
      color: #666;
      font-size: 14px;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.3s;
    }

    .forgot-password:hover {
      color: #e74c3c;
    }

    .continue-btn {
      width: 100%;
      height: 50px;
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%) !important;
      color: white !important;
      font-size: 16px;
      font-weight: 600;
      border-radius: 10px;
      border: none;
      text-transform: none;
      box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
      margin-bottom: 20px;
      transition: all 0.3s;
    }

    .continue-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
    }

    .continue-btn:disabled {
      opacity: 0.6;
    }

    .continue-btn mat-spinner {
      margin: 0 auto;
      
      ::ng-deep circle {
        stroke: white !important;
      }
    }

    .divider-container {
      position: relative;
      text-align: center;
      margin: 25px 0;
    }

    .divider-container::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.5);
    }

    .divider-text {
      position: relative;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.9) 0%,
        rgba(245, 245, 255, 0.85) 100%
      );
      padding: 0 15px;
      color: #888;
      font-size: 13px;
    }

    .uaepass-btn {
      width: 100%;
      height: 50px;
      background: white !important;
      color: #2a2a2a !important;
      font-size: 15px;
      font-weight: 500;
      border: 2px solid rgba(255, 255, 255, 0.6) !important;
      border-radius: 10px;
      text-transform: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s;
    }

    .uaepass-btn:hover {
      background: rgba(255, 255, 255, 0.95) !important;
      border-color: rgba(200, 200, 200, 0.8) !important;
    }

    .uae-icon {
      font-size: 22px;
      width: 22px;
      height: 22px;
    }

    .request-access {
      text-align: center;
      margin-top: 25px;
    }

    .request-access a {
      color: #666;
      font-size: 14px;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.3s;
    }

    .request-access a:hover {
      color: #e74c3c;
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .login-content {
        gap: 60px;
      }
    }

    @media (max-width: 968px) {
      .login-content {
        flex-direction: column;
        gap: 40px;
        padding: 20px;
      }

      .left-section,
      .right-section {
        flex: unset;
        width: 100%;
        max-width: 500px;
      }

      .logo-text {
        font-size: 36px;
      }

      .logo-badge {
        font-size: 24px;
        padding: 12px 40px;
      }
    }

    @media (max-width: 576px) {
      .login-box {
        padding: 35px 25px;
      }

      .signin-title {
        font-size: 26px;
      }

      .logo-text {
        font-size: 28px;
      }

      .logo-badge {
        font-size: 20px;
        padding: 10px 30px;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      staySignedIn: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }

  signInWithUAEPass(): void {
    this.snackBar.open('UAE Pass integration coming soon', 'Close', {
      duration: 3000
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}