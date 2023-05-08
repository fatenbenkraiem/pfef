import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminreserveComponent } from './components/admin/pages/adminreserve/adminreserve.component';
import { AdminuserComponent } from './components/admin/pages/adminuser/adminuser.component';
import { AdmintypeComponent } from './components/admin/pages/admintype/admintype.component';
import { AdminresComponent } from './components/admin/pages/adminres/adminres.component';
import { ProfileComponent } from './components/admin/pages/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ResComponent } from './components/res/res.component';
import { TypeComponent } from './components/type/type.component';
import { UserreserveComponent } from './components/user/pages/userreserve/userreserve.component';
import { UserresComponent } from './components/user/pages/userres/userres.component';
import { ProfilComponent } from './components/user/pages/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth-guard.service';
import { SigninComponent } from './components/user/signin/signin.component';
import { NoguardUserGuard } from './guards/noguard-user.guard';
import { AuthUserService } from './services/auth-user.service';
const routes: Routes = [
  
  { path: "", redirectTo: "res", pathMatch: "full" },
  { path: "type", component: TypeComponent },
  { path: "res", component: ResComponent },
    { path: "reserve", component: ReservationComponent },
  { path: "CONTACT", component: ContactComponent },
  /* Admin routes */
  { path: "admin/demandeur", component: AdminuserComponent /*, canActivate: [AuthGuard], data: { roles: ['admin'] } */  },
  { path: "admin/reserve", component: AdminreserveComponent /*, canActivate: [AuthGuard], data: { roles: ['admin'] } */ },
  { path: "admin/type", component: AdmintypeComponent /*, canActivate: [AuthGuard], data: { roles: ['admin'] } */  },
  { path: "admin/res", component: AdminresComponent /*, canActivate: [AuthGuard], data: { roles: ['admin'] } */},
  { path: "admin/edit", component: ProfileComponent /*, canActivate: [AuthGuard], data: { roles: ['admin'] } */ },
  { path: "admin/login", component: LoginComponent },
  /* User routes */
  { path:"user/reserve",component:UserreserveComponent , canActivateChild:[AuthUserService] } ,
  { path: "user/res", component: UserresComponent  },
  { path: "user/edit", component: ProfilComponent , canActivateChild:[AuthUserService] },
  {path:"login", component:SigninComponent ,canActivateChild:[NoguardUserGuard]},
  {path:"register", component: RegisterComponent ,canActivateChild:[NoguardUserGuard]},
  { path: "**", redirectTo: "res", pathMatch: "full"   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
