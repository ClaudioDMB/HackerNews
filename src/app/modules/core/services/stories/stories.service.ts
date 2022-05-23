import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  scan,
  switchMap,
} from 'rxjs';
import { StoriesFilterType } from '../../models/stories/stories-filter-type.enum';
import { Story } from '../../models/stories/story.model';
import { PaginatedStoriesResponse } from '../../models/stories/paginated-stories-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  apiUrl: string = environment.apiURL;
  pageSize = 10;
  stories$: Observable<Story[]>;
  storiesFilterType$: BehaviorSubject<string> = new BehaviorSubject<string>(
    StoriesFilterType.newStories
  );

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) {
    /* Listen for pagination page and storyFilter changes
      Retrieve a Story[] using other service defined method
      With scan operator, it aggregate previous story item array with the
      story items just loaded
     */
    this.stories$ = combineLatest([
      this.storiesFilterType$.pipe(distinctUntilChanged()),
      this.currentPage$,
    ]).pipe(
      switchMap(([type, page]) => this.getPaginatedStoriesIds(type, page)),
      scan((acc, curr) => {
        if (acc.type === curr.type) {
          acc.stories = acc.stories.concat(curr.stories);
        } else {
          acc = curr;
        }
        return acc;
      }),
      map((value) => value.stories)
    );
  }

  /**
   * Retrieve storiesIds, filter for the stories items to load, then load them
   * @param type
   * @param currentPage
   * @returns
   */
  getPaginatedStoriesIds(
    type: string,
    currentPage: number
  ): Observable<PaginatedStoriesResponse> {
    return this.getStoriesIds(type).pipe(
      map((storiesIds) => {
        const lastStoryPosition = currentPage * this.pageSize;
        const currentStories = storiesIds.slice(
          lastStoryPosition - this.pageSize,
          lastStoryPosition
        );
        return currentStories;
      }),
      switchMap((storiesIds) => {
        let calls: Array<Observable<Story>> = [];
        storiesIds.forEach((id) => calls.push(this.getStory(id)));
        return forkJoin(calls);
      }),
      map((stories) => ({ type, stories }))
    );
  }

  /**
   * Retrieve stories ids array by story type
   * @param filter
   * @returns Observable<number[]>
   */
  getStoriesIds(filter: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/${filter}.json`);
  }

  /**
   * Retrieve story by story id
   * @param id
   * @returns Story
   */
  getStory(id: number): Observable<Story> {
    return this.http.get<Story>(`${this.apiUrl}/item/${id}.json`);
  }
}
