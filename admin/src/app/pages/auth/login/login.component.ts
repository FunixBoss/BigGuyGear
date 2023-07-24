import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../@core/services/account/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup
  errorMessage: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
    1
  }

  login() {
    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginFormGroup.get('email').value, this.loginFormGroup.get('password').value)
      .subscribe(data => {
        console.log(data);
        
        if("result" in data) {
          this.showError()
        } else {
          this.saveToken(data.token)
          this.authService.authChange()
          this.router.navigate(['/admin/dashboard'])
        }
      }) 
  }

  showError() {
    this.errorMessage = 'Invalid email or password'
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

}
