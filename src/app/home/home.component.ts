import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LandingSectionComponent } from '../landing-section/landing-section.component';
import { MarqueeBrandsComponent } from '../marquee-brands/marquee-brands.component';
import { VideoSectionComponent } from '../video-section/video-section.component';
import { SecondSectionComponent } from '../second-section/second-section.component';
import { ProductCarouselTwoComponent } from '../product-carousel-two/product-carousel-two.component';
import { TopRatingComponent } from '../top-rating/top-rating.component';
import { MapComponent } from '../map/map.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductCarousalComponent } from "../product-carousal/product-carousal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    LandingSectionComponent,
    MarqueeBrandsComponent,
    VideoSectionComponent,
    SecondSectionComponent,
    ProductCarouselTwoComponent,
    TopRatingComponent,
    MapComponent,
    FooterComponent,
    ProductCarousalComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
