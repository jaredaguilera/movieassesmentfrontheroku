import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { InitComponent } from './components/init/init.component';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  { path : 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path : 'init', component: InitComponent},
  { path : 'info', component: InfoComponent, canActivate:[AuthGuard]},
  { path : '**', pathMatch: 'full' ,redirectTo: 'init'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
