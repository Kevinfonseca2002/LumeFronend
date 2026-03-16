import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpAuth } from '../../../core/services/http-auth';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { HttpUsers } from '../../../core/services/http-users';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  role!: string | undefined
  role$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)
  storeData!: any
  storeId!:string | undefined
  

  constructor(
    public httpAuth: HttpAuth,
    private router: Router,
    public httpUsers:HttpUsers
  ) {}

  ngOnInit(){
    this.httpAuth.getRole().subscribe({
      next: (data=>
        this.role=data),
      error: (error=>console.error(error))
    })
        this.httpAuth.getId().subscribe({
      next: (data) => {
        this.storeId = data
        if(this.storeId){
          this.httpUsers.getUserById(this.storeId).subscribe({
            next: (data) => {
              this.storeData = data.userById
              console.log(this.storeData)
            },
            error: (error) => {
              console.log(error);
            }
          })
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onLogout(){
    this.httpAuth.logout()
    this.router.navigate(["home"])
  }
}
