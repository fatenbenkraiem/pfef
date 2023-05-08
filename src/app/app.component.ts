import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'template';
  /*constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const requiresAuthentication = event['url'] !== '/login';
        if (requiresAuthentication && !this.authService.isAuthenticated) {
          this.router.navigate(['/login']);
        }
      }
    });
  }*/

}
