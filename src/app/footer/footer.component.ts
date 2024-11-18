import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPhone,
  faEnvelope,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  phone = faPhone;
  mail = faEnvelope;
  arrow = faChevronRight;
  facebook = faFacebook;
  instagram = faInstagram;
  twitter = faXTwitter;
  youtube = faYoutube;
}
