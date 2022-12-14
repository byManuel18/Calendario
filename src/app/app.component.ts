import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calendario';

  dateSelected!: Date;

  onSelectDate($event : Date){
    this.dateSelected = $event;
  }
}
