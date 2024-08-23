import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public loginInfo={email:"",token:"",error:"",isloading:false}


  constructor(private router: Router,private loginservice:LoginService) { 
    this.loginservice._login.subscribe(data => {this.loginInfo = data;});
  }

  home(){
    this.router.navigate(['/'])
  }
  login(){
    this.router.navigate(['/login']);
  }
  signup(){
    this.router.navigate(['/signup']);
  }
  logout(){
    this.loginservice.clearLogin()
    this.router.navigate(['/login']);
  }

}
