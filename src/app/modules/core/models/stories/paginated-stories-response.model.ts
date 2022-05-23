import { Story } from "./story.model";

export interface PaginatedStoriesResponse {
    stories: Story[];
    type: string;
}