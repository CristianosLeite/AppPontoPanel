import { Component, Input } from '@angular/core';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() role: Role['role_name'] | undefined = undefined;
}
