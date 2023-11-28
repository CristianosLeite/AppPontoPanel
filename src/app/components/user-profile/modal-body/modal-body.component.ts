import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss']
})
export class ModalBodyComponent implements OnInit {
  /**
   * @description Define se o modal está em modo de edição ou visualização.
   * @default true (visualização)
  */
  @Input() readOnly: boolean = true;
  /**
   * @description Usuário a ser exibido no modal.
   * @default Usuário logado
  */
  @Input() user = {} as User;

  userPhoto: string | ArrayBuffer | null = null;

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

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.user = this.usersService.user;
    this.form.patchValue(this.user);
  }

  handleFileInput(event: any) {
    const file = event!.target!.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userPhoto = reader.result;
    };
  }
}
