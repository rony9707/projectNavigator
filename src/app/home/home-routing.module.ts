import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/authguard.service';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'home', // Matches '/about' directly
    component: HomeComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
