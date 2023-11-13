import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-tags',
  templateUrl: './filter-tags.component.html',
  styleUrls: ['./filter-tags.component.scss']
})
export class FilterTagsComponent {
  @Output() tagsChanged = new EventEmitter<string[]>();
  tags = [] as string[];
  newTag: string = '';

  addTag() {
    if (this.newTag) {
      this.tags.push(this.newTag);
      this.newTag = '';
      this.tagsChanged.emit(this.tags);
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.tagsChanged.emit(this.tags);
  }
}
