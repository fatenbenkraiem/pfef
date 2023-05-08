import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { NgToastService} from 'ng-angular-popup';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userauth :User =new User();
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidregister = false;
  registerSuccess = false;
  constructor(
    private toastr: NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthUserService) {   }

  ngOnInit(): void {
  }

 Register() {
  this.userauth.role="user";
  console.log(this.userauth)
  this.authenticationService.registeruser(this.userauth).subscribe((result)=> {
    console.log(Object.values(result))
    this.toastr.success({detail:"Message succès!",summary:"Register Successful!",duration:2000})
    let id = Object.values(result)[1]
    let token = Object.values(result)[3]
    this.authenticationService.savesession(id,token)
    this.invalidregister = false;
    this.registerSuccess = true;
    this.successMessage = 'Register Successful.';
    this.router.navigate(['/user/edit']);
  }, (error) => {
    console.log(error)
    this.invalidregister = true;
    this.registerSuccess = false;
  }
  );      
}
}
