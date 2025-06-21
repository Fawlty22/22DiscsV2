import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Disc } from '../models/disc.model';

@Injectable({
  providedIn: 'root'
})
export class DiscCollectionService {
  private discs: Disc[] = [];
  private discsSubject = new BehaviorSubject<Disc[]>([]);
  
  constructor() {
    // Load initial data from localStorage if available
    const savedDiscs = localStorage.getItem('discCollection');
    if (savedDiscs) {
      this.discs = JSON.parse(savedDiscs);
      this.discsSubject.next(this.discs);
    }
  }

  getDiscs(): Observable<Disc[]> {
    return this.discsSubject.asObservable();
  }

  addDisc(disc: Disc): void {
    disc.id = Date.now().toString();
    disc.dateAdded = new Date();
    this.discs.push(disc);
    this.discsSubject.next([...this.discs]);
    this.saveToLocalStorage();
  }

  removeDisc(id: string): void {
    this.discs = this.discs.filter(disc => disc.id !== id);
    this.discsSubject.next([...this.discs]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('discCollection', JSON.stringify(this.discs));
  }
}
