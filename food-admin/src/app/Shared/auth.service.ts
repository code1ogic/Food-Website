import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router) { }

  // login
  login(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      res => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', 'true');
      }, err => {
        alert(err.message);
      }
    )
  }

  // logout
  logout() {
    this.firebaseAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }
}
