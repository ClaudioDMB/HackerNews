import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesListComponent } from './stories-list/stories-list.component';
import { StoriesItemComponent } from './stories-item/stories-item.component';
import { StoriesFilterComponent } from './stories-filter/stories-filter.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    StoriesListComponent,
    StoriesItemComponent,
    StoriesFilterComponent,
  ],
  imports: [CommonModule, FormsModule, InfiniteScrollModule, ButtonsModule],
  exports: [StoriesListComponent],
})
export class StoriesModule {}
