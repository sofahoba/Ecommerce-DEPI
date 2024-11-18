import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductCarousalComponent } from './product-carousal.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-carousal',
  template: '<swiper-container></swiper-container>'
})
class MockProductCarousalComponent {
  slidesPerView: number = 3;
}

describe('ProductCarousalComponent', () => {
  let component: MockProductCarousalComponent;
  let fixture: ComponentFixture<MockProductCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockProductCarousalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockProductCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a swiper-container element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('swiper-container')).toBeTruthy();
  });

  it('should have correct number of swiper-slide elements', () => {
    const compiled = fixture.nativeElement;
    const slides = compiled.querySelectorAll('swiper-slide');
    expect(slides.length).toBeGreaterThan(0); // Adjust this based on your actual number of slides
  });

  it('should have correct Swiper configuration', () => {
    const compiled = fixture.nativeElement;
    const swiperContainer = compiled.querySelector('swiper-container');
    expect(swiperContainer.getAttribute('loop')).toBe('true');
    expect(swiperContainer.getAttribute('navigation')).toBe('true');
    expect(swiperContainer.getAttribute('speed')).toBe('500');
    expect(swiperContainer.getAttribute('space-between')).toBe('10');
    expect(swiperContainer.getAttribute('slides-per-view')).toBe(component.slidesPerView.toString());
  });

  // Add more tests as needed
});
