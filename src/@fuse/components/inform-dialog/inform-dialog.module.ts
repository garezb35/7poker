import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FuseInformDialogComponent } from '@fuse/components/inform-dialog/inform-dialog.component';

@NgModule({
    declarations: [
        FuseInformDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        FuseInformDialogComponent
    ],
})
export class FuseInformDialogModule
{
}
