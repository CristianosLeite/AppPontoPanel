import { Component, Input } from '@angular/core';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @Input() role: Role['role_name'] | undefined = undefined;
}
