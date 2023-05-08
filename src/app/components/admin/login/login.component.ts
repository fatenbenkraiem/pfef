import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 userauth :User =new User();
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;
  retUrl:string="admin/edit";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit(): void{
    /*this.activatedRoute.queryParamMap
    .subscribe(params => {
    this.retUrl = params.get('retUrl'); 
   console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
});*/
  }

 Login() {
  this.authenticationService.authenticationService(this.userauth).subscribe((result)=> {
    console.log(Object.values(result))
    let id = Object.values(result)[2]
    let token = Object.values(result)[3]
    console.log(id)
    this.authenticationService.savesession(id,token)
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.successMessage = 'Login Successful.';
  this.router.navigate([this.retUrl]);
  }, (error) => {
    console.log(error)
    this.invalidLogin = true;
    this.loginSuccess = false;
  });      
}
}
