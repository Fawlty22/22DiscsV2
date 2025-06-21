import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Disc } from '../../models/disc.model';
import { DiscCollectionService } from '../../services/disc-collection.service';
import { MaterialModule } from '../../material-module';
import { AddDiscDialogComponent } from './add-disc-dialog.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-disc-collection',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    AddDiscDialogComponent,
  ],
  templateUrl: './disc-collection.component.html',
  styleUrls: ['./disc-collection.component.scss'],
  providers: [DiscCollectionService],
})
export class DiscCollectionComponent {
  discs: Disc[] = [];
  filterForm: FormGroup;
  dialog = inject(MatDialog);
  fb = inject(FormBuilder);

  constructor(private discCollectionService: DiscCollectionService) {
    this.filterForm = this.fb.group({
      type: [''],
      condition: [''],
    });

    this.discCollectionService.getDiscs().subscribe((discs) => {
      this.discs = discs;
    });
  }

  get filterType() {
    return this.filterForm.get('type')?.value;
  }

  get filterCondition() {
    return this.filterForm.get('condition')?.value;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDiscDialogComponent, {
      width: '500px',
      data: {
        manufacturer: '',
        model: '',
        type: '',
        color: '',
        condition: '',
        notes: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.discCollectionService.addDisc(result);
      }
    });
  }

  removeDisc(id: string): void {
    this.discCollectionService.removeDisc(id);
  }

  getFilteredDiscs(): Disc[] {
    return this.discs.filter((disc) => {
      const typeMatch = !this.filterType || disc.type === this.filterType;
      const conditionMatch =
        !this.filterCondition || disc.condition === this.filterCondition;
      return typeMatch && conditionMatch;
    });
  }
}
