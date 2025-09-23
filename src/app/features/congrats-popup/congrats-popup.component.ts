import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-congrats-popup',
  standalone: false,
  templateUrl: './congrats-popup.component.html',
  styleUrl: './congrats-popup.component.css'
})
export class CongratsPopupComponent {

constructor(private route: ActivatedRoute, private dialog:MatDialog, private ref:MatDialogRef<CongratsPopupComponent>){}

closeCongratsPopp(){
  this.ref.close()
}

 
}
