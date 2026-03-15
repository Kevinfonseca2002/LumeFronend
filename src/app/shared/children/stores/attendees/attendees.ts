import { Component } from '@angular/core';
import { HttpUsers } from '../../../../core/services/http-users';
import { HttpAuth } from '../../../../core/services/http-auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendees',
  imports: [DatePipe],
  templateUrl: './attendees.html',
  styleUrl: './attendees.scss',
})
export class Attendees {

  storeId!:string | undefined;
  events!: any[];

constructor(
  public httpAuth: HttpAuth,
  public httpUser: HttpUsers
){}

ngOnInit(): void {
  this.httpAuth.getId().subscribe({
      next:(data)=>{
        this.storeId=data;
        if(this.storeId){
          this.httpUser.getUserById(this.storeId).subscribe({
            next: (data)=>{
              this.events=data.userById.events
            },
            error:(err)=>console.error(err),
            complete:()=>console.log(this.storeId,this.events)
          })
        }
      
      },
      error:(err)=>console.error(err)
    })
  }

}
