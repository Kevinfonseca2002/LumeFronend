import { Component } from '@angular/core';
import { HttpUsers } from '../../../../core/services/http-users';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpAuth } from '../../../../core/services/http-auth';
@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {

  selectedFile!: File 
  editForm!:FormGroup
  storeId!:string | undefined
  storeData!:any[]

  constructor(
    public httpUsers: HttpUsers,
    private httpAuth:HttpAuth
  ){
    this.editForm = new FormGroup ({
          userName: new FormControl(""),
          email:new FormControl(""),
          phone:new FormControl(""),
          location:new FormControl(""),
          description:new FormControl("")
    })
  }

  ngOnInit(){
    this.httpAuth.getId().subscribe({
      next: (data) => {
        this.storeId = data
        if(this.storeId){
          this.httpUsers.getUserById(this.storeId).subscribe({
            next: (data) => {
              this.storeData = data
              console.log(data)
              this.editForm.patchValue({
                userName: data.userById.userName,
                email: data.userById.email,
                phone: data.userById.phone,
                location: data.userById.location,
                description: data.userById.description
              })
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

  onFileChange(event: any){
    const file = event.target.files[0]
    if(file) this.selectedFile = file
  }

  onSubmit(){
    // this.httpUsers.updateUser(this.storeId, this.editForm.value).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
    const formData = new FormData()
    
    Object.keys(this.editForm.value).forEach(key => {
        formData.append(key, this.editForm.value[key])
    })
    if(this.selectedFile) formData.append('userImg', this.selectedFile)

    this.httpUsers.updateUser(this.storeId, formData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error)
    })
  }

}
