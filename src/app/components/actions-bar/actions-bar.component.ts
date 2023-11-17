import { User } from 'src/app/interfaces/user.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss']
})
export class ActionsBarComponent {
  @Input() user: User | null = null;
  @Input() loggedUser: User | null = null;
}
