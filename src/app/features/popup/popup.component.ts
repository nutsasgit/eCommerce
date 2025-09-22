import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

constructor(private router: Router, private ref:MatDialogRef<PopupComponent>){}

closepopup(){
  this.ref.close()
}
redirectToProducts(){
  this.ref.close();
  this.router.navigate(['/product']);
}
}
