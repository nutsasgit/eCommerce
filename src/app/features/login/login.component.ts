import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  avatar: string;
  id: number;
}

interface AuthResponse {
  token: string;
  user: User;
}


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  avatar: File | null = null;
  avatarPreview: string | ArrayBuffer | null = '/profileImage.png';

  loginEmail: string = '';
  loginPassword: string = '';
  isLoginMode: boolean = false; 

  showPassword = false;
  showConfirmPassword = false;
  
  constructor(private http: HttpClient, private router: Router) {}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;

      //Preview
      const reader = new FileReader();
      reader.onload = e => this.avatarPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  removeAvatar() {
    this.avatar = null;
    this.avatarPreview = '/profileImage.png';
  }


  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('username', this.username);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.confirmPassword);

    if (this.avatar instanceof File){
      formData.append('avatar',this.avatar, this.avatar.name);
    }

    const headers = new HttpHeaders({
      'Accept': "application/json"
    });
    this.http.post<any>('https://api.redseam.redberryinternship.ge/api/register',formData, {headers})
    .subscribe({
      next: (response) => {
        console.log('registration successful:', response);
        localStorage.setItem('token', response.token);
        if (response.user?.avatar) {
          localStorage.setItem('avatar', response.user.avatar);
        }
        this.router.navigate(['/product']);
      },
      error:(err)=>{
        if (err.status === 422){
          console.error("Validation details:", err.error);
          alert("Validation error. Check from fields")
        } else if(err.status === 401){
          alert("invalid Token.");
        }
        
      }
    });
 
  }
  onLogin(){
    const body = {
      email: this.loginEmail,
      password: this.loginPassword
    };
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    this.http.post<any>('https://api.redseam.redberryinternship.ge/api/login', body, { headers })
      .subscribe({
        next: (response) => {
          console.log('login successful:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('avatar', response.user.avatar);
          this.router.navigate(['/product']); 
        },
        error: (err) => {
          console.error("Login error:", err.error);
          alert("Login failed. Check email and password.");
        }
      });
   
     
  }
switchToLogin(){
    this.isLoginMode = true;
  }

  switchToRegister(){
    this.isLoginMode = false;
  }

}

