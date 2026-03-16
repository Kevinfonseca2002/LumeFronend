import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup,FormControl } from '@angular/forms';
import { HttpUsers } from '../../../core/services/http-users';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpAuth } from '../../../core/services/http-auth';
import { BehaviorSubject, firstValueFrom, Observable, switchMap } from 'rxjs';
import { Profile } from '../../children/users/profile/profile';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'editForm',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './profile-editform.html',
  styleUrl: './profile-editform.scss',
})
export class ProfileEditform {
  editForm!:FormGroup;
  public user: Observable <any> = new Observable<any>();
  private user$:BehaviorSubject<void> = new BehaviorSubject<void>(undefined)

  id!: string;
  userData!: any;

  constructor(
    private httpUsers: HttpUsers,
    private activatedRoute: ActivatedRoute,
    public httpAuth: HttpAuth,
    private profile: Profile
  ){
    this.editForm = new FormGroup ({
      userName: new FormControl("",),
      description: new FormControl("",),
      email: new FormControl("",),
      location: new FormControl("",)
    })
  }

  ngOnInit() {
    this.user = this.user$.pipe(
      switchMap( async()=> await firstValueFrom(this.httpAuth.currentUser$))
    )

    console.log(this.user)

    this.user.subscribe({
      next: ( data ) => {
        console.log( data)

        this.userData = data;  

        this.id = data._id;
        this.editForm.patchValue({
          userName: this.userData ?.userName,
          description: this.userData ?.description,
          email: this.userData ?.email,
          location: this.userData ?.location
        })
      },
      error: (error) => {
        console.log( error )
      },
      complete: () => {}
    })


  }

  onSubmit(){
    this.httpUsers.updateUser(this.id,this.editForm.value).subscribe({
      next: data => this.profile.editMode= false,
      error: error => console.error(error)
    })
  }

}
