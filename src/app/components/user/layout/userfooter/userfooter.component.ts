import { Component } from '@angular/core';

@Component({
  selector: 'app-userfooter',
  templateUrl: './userfooter.component.html',
  styleUrls: ['./userfooter.component.sass']
})
export class UserfooterComponent  {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
