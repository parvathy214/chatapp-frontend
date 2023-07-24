import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// import {MatSnackBarHorizontalPosition,
//   MatSnackBarVerticalPosition} from
// import { from } from 'rxjs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports:[
           MatSlideToggleModule,MatFormFieldModule,
           MatCardModule,MatDividerModule,MatSnackBarModule,
           MatButtonModule,MatInputModule





  ]
})
export class MaterialdesignModule { }
