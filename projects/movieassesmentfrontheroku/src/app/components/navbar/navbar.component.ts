import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
  }

  login(){
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout();
  }

}
