import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { FakeStoreService } from '../fake-store.service';

register();

@Component({
  selector: 'app-product-carousal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './product-carousal.component.html',
  styleUrl: './product-carousal.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCarousalComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiperElement: ElementRef | undefined;

  right = faArrowRight;
  swiperConfig: any;
  slides: any[] = [];
  slidesPerView: number = 3; // Or any default value you prefer
  products: any[] = [];
  constructor(private fakeStoreService: FakeStoreService) {
  }

  async ngOnInit() {
    this.swiperConfig = {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    };

    try {
      this.products = await this.fakeStoreService.getLimitedProducts(10);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  ngAfterViewInit() {
    if (this.swiperElement) {
      Object.assign(this.swiperElement.nativeElement, this.swiperConfig);
      this.swiperElement.nativeElement.initialize();
    }
  }
}
