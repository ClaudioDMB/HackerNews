import { Component, Input } from '@angular/core';
import { Story } from '../../core/models/stories/story.model';

@Component({
  selector: 'stories-item',
  templateUrl: './stories-item.component.html',
  styleUrls: ['./stories-item.component.scss'],
})
export class StoriesItemComponent {
  @Input() story: Story | undefined;
  constructor() {}

  goToUrl(url: string) {
    window.open(url, '_blank');
  }
}
