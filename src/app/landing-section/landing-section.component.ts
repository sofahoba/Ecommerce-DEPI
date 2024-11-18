import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-landing-section',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './landing-section.component.html',
  styleUrl: './landing-section.component.css',
})
export class LandingSectionComponent {
  right = faArrowRight;
}
