import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'fuse-inform-dialog',
    templateUrl: './inform-dialog.component.html',
    styleUrls  : ['./inform-dialog.component.scss']
})
export class FuseInformDialogComponent
{
    public message: string;
    public title: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseInformDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<FuseInformDialogComponent>
    )
    {
        this.title = "Information";
    }

}
