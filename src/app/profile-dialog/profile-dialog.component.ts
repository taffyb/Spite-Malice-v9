import { Component, Inject, Optional,  OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {IProfileModel,DEFAULT_PROFILE} from '../classes/profile';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
  _profile:IProfileModel=DEFAULT_PROFILE;
  profile={};
  
  constructor(
          public dialogRef: MatDialogRef<ProfileDialogComponent>,
          @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
      if(data && data.profile){
          this._profile=data.profile;
      }
      console.log(`onOpen:${JSON.stringify(data.profile)}`);
//      dialogRef.disableClose=true;
  }

  ngOnInit() {
  }
  onSubmit() {

  }
  
  closeDialog(save:boolean){ 
//      console.log(`${JSON.stringify(this._profile)}`);
      if(save){
          this.dialogRef.close({event:'close',data:this.profile});
      }else{
          this.dialogRef.close({event:'close'});
      }
  }
}
