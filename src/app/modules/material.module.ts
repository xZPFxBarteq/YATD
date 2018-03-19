import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatOptionModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatToolbarModule, MatTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  exports : [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    MatRadioModule,
    MatTooltipModule
  ]
})
export class MaterialModule {
}
