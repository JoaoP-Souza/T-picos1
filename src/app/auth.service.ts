import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/api/users'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  validateUser(user: User): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const matchedUser = users.find(u => u.email === user.username && u.password === user.password);
        return !!matchedUser; // Return true if a matching user is found, false otherwise
      })
    );
  }
}
