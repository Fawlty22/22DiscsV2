import { Routes } from '@angular/router';
import { DiscCollectionComponent } from './components/disc-collection/disc-collection.component';
import { TradeOfferComponent } from './components/trade-offer/trade-offer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'collection', component: DiscCollectionComponent },
  { path: 'trade-offer', component: TradeOfferComponent },
  { path: '**', redirectTo: '/' },
];
