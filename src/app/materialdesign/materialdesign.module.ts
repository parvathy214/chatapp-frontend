import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports:[MatSlideToggleModule,MatFormFieldModule,
           MatCardModule,MatDividerModule




  ]
})
export class MaterialdesignModule { }
