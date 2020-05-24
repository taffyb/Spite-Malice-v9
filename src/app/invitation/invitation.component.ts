import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {IInvitationModel} from 's-n-m-lib';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  @Input()invite:IInvitationModel;
  @Output()onAccept:EventEmitter<IInvitationModel>=new EventEmitter<IInvitationModel>();
  @Output()onDecline:EventEmitter<IInvitationModel>=new EventEmitter<IInvitationModel>();
  
  constructor() { }

  ngOnInit() {
  }
  
  accept(){
      this.onAccept.emit(this.invite);
  }
  decline(){
      this.onDecline.emit(this.invite);
  }
}
