import { Routes } from '@angular/router';
import { DiscCollectionComponent } from './components/disc-collection/disc-collection.component';

export const routes: Routes = [
  { path: '', redirectTo: '/collection', pathMatch: 'full' },
  { path: 'collection', component: DiscCollectionComponent },
  { path: '**', redirectTo: '/collection' }
];
