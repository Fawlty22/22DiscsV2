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

  constructor(
    public dialogRef: MatDialogRef<AddDiscDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDiscDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      color: ['', Validators.required],
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
