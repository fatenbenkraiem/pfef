import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  
  constructor( private router :Router ) { }
  
  redirectTo(){
    this.router.navigate(['/res'])
  }
  ngOnInit(): void {
  
    this.gotoTop()
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
