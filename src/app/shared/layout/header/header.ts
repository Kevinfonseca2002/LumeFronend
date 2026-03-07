import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpAuth } from '../../../core/services/http-auth';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  role!: string | undefined
  role$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)
  

  constructor(
    public httpAuth: HttpAuth,
    private router: Router
  ) {}

  ngOnInit(){
    this.httpAuth.getRole().subscribe({
      next: (data=>
        this.role=data),
      error: (error=>console.error(error))
    })
  }

  onLogout(){
    this.httpAuth.logout()
    this.router.navigate(["home"])
  }
}
