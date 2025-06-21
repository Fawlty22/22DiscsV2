import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material-module';

interface AddDiscDialogData {
  manufacturer: string;
  model: string;
  type: string;
  color: string;
  condition: string;
  notes: string;
}

@Component({
  selector: 'app-add-disc-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-disc-dialog.component.html',
  styleUrls: ['./add-disc-dialog.component.scss'],
})
export class AddDiscDialogComponent {
  form: FormGroup;
  colors: { name: string; hex: string }[] = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Turquoise', hex: '#40E0D0' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Bronze', hex: '#CD7F32' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddDiscDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDiscDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      color: [this.colors[0].hex, Validators.required],
      condition: ['', Validators.required],
      notes: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get formData() {
    return this.form.value;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
