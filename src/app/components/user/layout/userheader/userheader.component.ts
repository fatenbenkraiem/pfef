import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { userservice } from 'src/app/services/user.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {
 
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
 
  constructor(private authenticationService :AuthenticationService ,private router: Router ,private Userservice :userservice) { }
  user :User =new User()
  ngOnInit(): void {
    this.getusers ();
  }

 /* toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }*/
  getusers (){
    let id :any =sessionStorage.getItem('id');
    this.Userservice.getuser(id).subscribe(data=>{
        console.log(data)
        this.user=data;
      } )
  }
  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
}
