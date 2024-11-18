import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faTruckFast, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css',
})
export class TrackComponent {
  box = faBox;
  truck = faTruckFast;
  list = faClipboardList
}
