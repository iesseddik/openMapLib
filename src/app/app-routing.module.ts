import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesListComponent } from './places-list/places-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PlaceDetailComponent },
  { path: 'places', component: PlacesListComponent },

];



@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
