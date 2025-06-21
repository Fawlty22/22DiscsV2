import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DiscCollectionComponent } from '../disc-collection/disc-collection.component';
import { Disc } from '../../models/disc.model';
import { TradeOffer } from '../../models/trade-offer.model';

@Component({
  selector: 'app-trade-offer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    DiscCollectionComponent,
  ],
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss'],
})
export class TradeOfferComponent implements OnInit {
  form: FormGroup;
  availableDiscs: Disc[] = [];
  selectedDiscs: Disc[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      discs: [[]],
    });
  }

  ngOnInit(): void {
    // TODO: Get user's available discs from service
    // For now, we'll use a mock array
    this.availableDiscs = [
      {
        id: '1',
        manufacturer: 'Innova',
        model: 'Discraft Buzzz',
        type: 'distance',
        color: '#FF0000',
        condition: 'new',
        notes: 'Brand new, never thrown',
        dateAdded: new Date(),
      },
    ];
  }

  addDisc(disc: Disc): void {
    if (!this.selectedDiscs.includes(disc)) {
      this.selectedDiscs.push(disc);
      this.form.patchValue({
        discs: this.selectedDiscs.map((d) => d.id),
      });
    }
  }

  removeDisc(disc: Disc): void {
    const index = this.selectedDiscs.indexOf(disc);
    if (index > -1) {
      this.selectedDiscs.splice(index, 1);
      this.form.patchValue({
        discs: this.selectedDiscs.map((d) => d.id),
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const offer: TradeOffer = {
        id: Date.now().toString(),
        userId: '1', // TODO: Get from auth service
        title: this.form.value.title,
        description: this.form.value.description,
        discs: this.form.value.discs,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
      };

      // TODO: Save to backend
      console.log('Submitting trade offer:', offer);
    }
  }
}
