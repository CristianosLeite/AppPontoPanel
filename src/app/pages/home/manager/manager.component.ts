import { Component, Input } from '@angular/core';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {
  @Input() role: Role['role_name'] | undefined = undefined;
}
