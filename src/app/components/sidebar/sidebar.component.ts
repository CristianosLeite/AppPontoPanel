import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isExpanded: boolean = true;

  constructor() { }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}
