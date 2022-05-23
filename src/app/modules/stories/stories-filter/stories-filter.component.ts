import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { StoriesFilterType } from '../../core/models/stories/stories-filter-type.enum';
import { StoriesService } from '../../core/services/stories/stories.service';

@Component({
  selector: 'stories-filter',
  templateUrl: './stories-filter.component.html',
  styleUrls: ['./stories-filter.component.scss'],
})
export class StoriesFilterComponent {
  @Output() storiesTypeChangedEvent: EventEmitter<void> = new EventEmitter();
  storiesFilterType = StoriesFilterType; //StoriesFilterTypeConsts
  activeButton$: Observable<string>;
  constructor(private storiesService: StoriesService) {
    this.activeButton$ = this.storiesService.storiesFilterType$;
  }

  /**
   * Called when stories type button is clicked
   * Set pagination to first page and change the stories type filter
   * @param filterType
   */
  changeStoriesType(filterType: string) {
    this.storiesTypeChangedEvent.emit();
    this.storiesService.currentPage$.next(1);
    this.storiesService.storiesFilterType$.next(filterType);
  }
}
