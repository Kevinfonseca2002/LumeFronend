import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'registerForm',
  imports: [ReactiveFormsModule],
  templateUrl: './register.store.html',
  styleUrl: './register.store.scss',
})
export class RegisterStore {
  formData!: FormGroup;

  constructor(private httpAuth: HttpAuth) {
    this.formData = new FormGroup({
      role: new FormControl('store'),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl(0, [Validators.required]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      facebookLink: new FormControl(''),
      instagramLink: new FormControl(''),
      xLink: new FormControl(''),
      tiktokLink: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.httpAuth.register(this.formData.value).subscribe({
        next: (response) => console.log(`Signed up successfully`, response),
        error: (error) => console.error('Error signing you up, please try again', error),
        complete: () => this.formData.reset(),
      });
      console.log(this.formData.value);
    }
  }
}
