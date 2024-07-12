import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: UploadFileComponent
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled',  preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
