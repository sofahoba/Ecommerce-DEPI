import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeBrandsComponent } from './marquee-brands.component';

describe('MarqueeBrandsComponent', () => {
  let component: MarqueeBrandsComponent;
  let fixture: ComponentFixture<MarqueeBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueeBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueeBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
