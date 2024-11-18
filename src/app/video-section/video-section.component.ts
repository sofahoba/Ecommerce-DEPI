import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.css',
})
export class VideoSectionComponent implements AfterViewInit {
  right = faArrowRight;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    // Add a small delay to ensure the view is fully initialized
    setTimeout(() => this.playVideo(), 0);
  }

  playVideo() {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.play().catch(error => {
        console.error('Error attempting to play video:', error);
      });
    } else {
      console.error('Video element not found');
    }
  }
}
