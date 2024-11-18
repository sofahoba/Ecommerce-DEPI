import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-carousel-two',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product-carousel-two.component.html',
  styleUrl: './product-carousel-two.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCarouselTwoComponent {
  right = faArrowRight;
  slidesPerView: number = 4;
  screenWidth!: number;
  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 320 && this.screenWidth <= 480) {
      this.slidesPerView = 1;
    } else if (this.screenWidth >= 480 && this.screenWidth <= 769) {
      this.slidesPerView = 2;
    } else if (this.screenWidth >= 769 && this.screenWidth <= 1024) {
      this.slidesPerView = 3;
    } else if (this.screenWidth >= 1024 && this.screenWidth <= 1440) {
      this.slidesPerView = 4;
    }
  }
}
