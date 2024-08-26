import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
type loginType={
  email:string,
  token:string,
  error:string,
  isloading:boolean,
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private login=new BehaviorSubject<loginType>({email:"",token:"",error:"",isloading:false});
 _login=this.login.asObservable()
 constructor() { 
  const savedLogin=localStorage.getItem('login')
  if(savedLogin){
    this.login.next(JSON.parse(savedLogin))
  }
 }
 updateLogin(loginInfo:loginType){
  this.login.next(loginInfo)
  localStorage.setItem('login',JSON.stringify(loginInfo))
 }
 clearLogin(){
  this.login.next({email:"",token:"",error:"",isloading:false})
  localStorage.removeItem('login')
 }
 isloggedin(){
  if(this.login.value.token===""){
    return false;
  }
  else{
    return true;
  }
 }  

}
