import { Component } from '@angular/core';
import { AuthService } from '../../../@core/services/account/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-logout',
  template: '<p></p>',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.logout().subscribe(
      data => {
        if(data.result) {
          localStorage.removeItem("token")
          authService.authChange()
          router.navigate(['/admin/auth/login'])
        }
      }
    )
  }

  
}
