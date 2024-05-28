import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.validateUser(this.user).subscribe(isValid => {
      if (isValid) {
        console.log('Login successful');
        // Navigate to the next page or display a success message
        this.router.navigate(['/chat-screen']);  // Replace with your actual route
      } else {
        console.log('Invalid credentials');
        // Display an error message
        alert('Credenciais inválidas');
      }
    });
  }
}
