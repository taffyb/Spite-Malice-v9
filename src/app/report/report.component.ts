import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile.service';
import {Location, TimeZone} from '../classes/timezones';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    locations$;
    timezones={};
  constructor(private profileSvc:ProfileService) { 
      this.locations$= profileSvc.getLocations$();
  }

  ngOnInit() {
  }

  async addTimeZone(location:string){
      const loc=new Location(location);
      const timezone = await this.profileSvc.getTimeZone$(loc).toPromise();
      this.timezones[location]=timezone;
      console.log(`addTimeZone:${JSON.stringify(timezone)}`); 
  }
}
