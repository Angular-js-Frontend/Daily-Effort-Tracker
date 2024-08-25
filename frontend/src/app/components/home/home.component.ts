import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { EffortsService } from '../../services/efforts.service';

import { FormsModule } from '@angular/forms';


type EffortType={
  id:number,
  userId:number,
  time:string,
  date:string,
  createdAt?:Date,
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

private token="";public value:EffortType[]=[];error="";time="";date="";formError="";

constructor(private http:HttpClient,private login:LoginService,private effort:EffortsService){

  effort._efforts.subscribe((data)=>{
    this.value=data;
  })
this.login._login.subscribe(data=>{
this.token = data.token;
if(this.token){
  const headers=new HttpHeaders({'Content-Type': 'application/json','authorization':`Bearer ${this.token}`});
  this.http.get<EffortType[]>(environment.apiUrl+"/efforts",{headers:headers}).subscribe({
    next:(data)=>{
      this.value=data;
      this.effort.updateEfforts(this.value)
    },
    error:(error)=>{},
    complete:()=>{}
  });
}
}
)
}



deleteitem(id:number){
  const headers=new HttpHeaders({'Content-Type': 'application/json','authorization':`Bearer ${this.token}`});
  this.http.delete(environment.apiUrl+'/efforts/'+`${id}`,{headers:headers}).subscribe({
    next:(data)=>{
      this.value=this.value.filter(item=>item.id!=id)
      this.effort.updateEfforts(this.value)
    },
    error:(error)=>{  
    this.error=error;
    }
  })
}



additem(){
  this.formError=""
  if(!this.time || !this.date){
    this.formError="please provie time and date"
    return;
  }
  const headers=new HttpHeaders({'Content-Type': 'application/json','authorization':`Bearer ${this.token}`});
  this.http.post<EffortType>(environment.apiUrl+'/efforts/',JSON.stringify({time:this.time,date:this.date}),{headers:headers}).subscribe(
    {
      next:(data)=>{
        this.effort.updateEachEffort(data)
      },
      error:(error)=>{
        this.formError=error.error.message
      }
    }
  )
}

}


