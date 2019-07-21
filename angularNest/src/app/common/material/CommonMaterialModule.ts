import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatTableModule, MatProgressBarModule, MatIconModule, MatTooltipModule, MatToolbarModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatSnackBarModule
        
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatProgressBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatSnackBarModule
    ],
    declarations: [],
    providers: [],
})
export class CommonMaterialModule { }
