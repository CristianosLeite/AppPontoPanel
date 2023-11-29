import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Role } from '../../interfaces/role.interface';
import { UsersService } from '../../services/users.service';
import { NotFoundService } from 'src/app/services/not-found.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  context = 'edit';

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  user: User | null = null;
  role: Role | undefined = undefined;

  alert = {
    show: false,
    msg: '',
    type: '',
    success: false
  }

  form = new FormGroup({
    user_id: new FormControl('', Validators.required),
    company_id: new FormControl('', Validators.required),
    cod_user: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    register_number: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    created_at: new FormControl('', Validators.required),
  });

  constructor(
    private readonly usersService: UsersService,
    private readonly notFound: NotFoundService
  ) { }

  ngOnInit() {
    this.role = this.usersService.user?.role;
    this.user = this.usersService.user;
    this.usersService.userLogged.subscribe((user) => {
      this.role = user.role;
      this.form.patchValue(user);
    });
    setTimeout(() => {
      this.role === undefined ? this.notFound.notFoundEvent.emit('clientError') : null;
    }, 100);
  }

  changeContext(context: string) {
    this.context = context;
  }
}
