import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShowTimeComponent } from './home/show-time/show-time.component';
import { SectionBorderDirective } from './directives/section-border.directive';
import { FormsModule } from '@angular/forms';
import { GoogleSearchComponent } from './home/google-search/google-search.component';
import { HomeRoutingModule } from './home-routing.module';
import { EnvLinksComponent } from './home/env-links/env-links.component';
import { SectionTitleComponent } from './shared/section-title/section-title.component';




@NgModule({
  declarations: [
    HomeComponent,
    ShowTimeComponent,
    SectionBorderDirective,
    GoogleSearchComponent,
    EnvLinksComponent,
    SectionTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
