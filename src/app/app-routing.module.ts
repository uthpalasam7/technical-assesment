import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: HomeComponent, path: '', canActivate: [AuthGuard] },
  { component: CustomerComponent, path: 'customer', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
