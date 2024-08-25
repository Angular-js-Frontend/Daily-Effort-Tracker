import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
type EffortType={
  id:number,
  userId:number,
  time:string,
  date:string,
  createdAt?:Date,
}


@Injectable({
  providedIn: 'root'
})
export class EffortsService {
  private efforts=new BehaviorSubject<EffortType[]>([]);
  public _efforts=this.efforts.asObservable();
  constructor() { 

  }

  updateEachEffort(effort:EffortType){
    const temp=[...this.efforts.value]
    temp.push(effort)
    this.efforts.next(temp);
  }

  updateEfforts(efforts:EffortType[]){
    this.efforts.next(efforts);
  }
}
