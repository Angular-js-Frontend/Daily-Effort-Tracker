import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
  type loginPostType={
    email:string,
    token:string
    }
    
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email:string="";
password:string="";
constructor(private http:HttpClient,private logininfo:LoginService,private router:Router) {

}

login(){
  let headers=new HttpHeaders().set('Content-Type', 'application/json')

  try{
    this.logininfo.updateLogin({email:"",token:"",error:"",isloading:true})

    this.http.post<loginPostType>(environment.apiUrl +"/users/login",JSON.stringify({email:this.email,password:this.password}),{headers:headers})
    .subscribe({
      next:(data)=>{
      this.logininfo.updateLogin({email:data.email,token:data.token,error:"",isloading:false})
      this.router.navigate(["/"])
      }
    ,error:(error)=>{
      this.logininfo.updateLogin({email:"",token:"",error:"",isloading:false})
    }
    })

  }
  catch(err){
    this.logininfo.updateLogin({email:"",token:"",error:"",isloading:false})
  }
}


}
