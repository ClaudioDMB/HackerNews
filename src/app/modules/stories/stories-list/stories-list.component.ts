import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Story } from '../../core/models/stories/story.model';
import { StoriesService } from '../../core/services/stories/stories.service';

@Component({
  selector: 'stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss'],
})
export class StoriesListComponent {
  @ViewChild('container')
  container!: ElementRef;
  stories$: Observable<Story[]>;
  loading: boolean = true;
  errorMessage: string | undefined;
  constructor(private storiesService: StoriesService) {
    this.stories$ = this.storiesService.stories$.pipe(
      tap(() => (this.loading = false)),
      catchError((error) => {
        this.errorMessage = error.message + " - Try refresh the page";
        this.loading = false;
        return of(error);
      })
    );
  }

  onScroll() {
    this.loading = true;
    this.storiesService.currentPage$.next(
      this.storiesService.currentPage$.value + 1
    );
  }

  storiesTypeChanged() {
    this.container.nativeElement.scrollTop = 0;
    this.loading = true;
  }
}
