import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service'; // Import UserService
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup; // Add the "!" symbol to indicate that it will be initialized later

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const password = this.registrationForm.get('password')?.value;
    const repeatPassword = this.registrationForm.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      console.log('Passwords do not match');
      return;
    }

    const newUser: User = this.registrationForm.value;

    this.userService.addUser(newUser).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
        // Optionally, you can reset the form after successful submission
        this.registrationForm.reset();
      },
      error: (error) => {
        console.error('Error adding user:', error);
        // Handle error, e.g., display an error message to the user
      }
    });
  }

}
