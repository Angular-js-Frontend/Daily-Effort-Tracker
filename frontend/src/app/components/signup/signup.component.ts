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
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent{
public email="";public password="";public confirmpassword="";public error="";

constructor(private http:HttpClient,private loginInfo:LoginService,private router:Router){

}


signup(){
  this.error=""
  if(this.password!==this.confirmpassword){
    this.error="Passwords do not match";
    return
  }
  const headers=new HttpHeaders({'Content-Type': 'application/json'});
  this.loginInfo.updateLogin({email:"",token:"",error:"",isloading:true})

  try{
    this.http.post<loginPostType>(environment.apiUrl+"/users/signup",JSON.stringify({email:this.email,password:this.password}),{headers:headers})
    .subscribe({
      next:data=>{
        this.loginInfo.updateLogin({email:data.email,token:data.token,error:"",isloading:false})
        this.router.navigate(['/'])
      },
      error:err=>{
        console.error(err)
        this.error=err.error.message
        this.loginInfo.updateLogin({email:"",token:"",error:"",isloading:false})
      }
    })
  }
  catch(err){
    this.error="something went wrong with the server"
    this.loginInfo.updateLogin({email:"",token:"",error:"",isloading:false})
  }
}



}
