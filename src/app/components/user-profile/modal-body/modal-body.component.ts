import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'src/app/services/message.service';

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

  /**
   * @description Define o contexto do modal.
  */
  @Output() context = new EventEmitter<string>();

  userPhoto: string | ArrayBuffer | null = null;
  confirmPassword: string = '';
  parameters: string[] = [];
  message: string = '';

  form = new FormGroup({
    user_id: new FormControl('', Validators.required),
    company_id: new FormControl('', Validators.required),
    cod_user: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    register_number: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    created_at: new FormControl('', Validators.required),
    address_id: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    neighborhood: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zip_code: new FormControl('', Validators.required),
  });

  originalForm = new FormGroup({
    user_id: new FormControl('', Validators.required),
    company_id: new FormControl('', Validators.required),
    cod_user: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    register_number: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    created_at: new FormControl('', Validators.required),
    address_id: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    neighborhood: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zip_code: new FormControl('', Validators.required),
  });

  constructor(
    private readonly usersService: UsersService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.user;
    this.form.patchValue(this.user);
    this.form.patchValue(this.user.addresses![0]);
    this.originalForm.patchValue(this.user);
    this.originalForm.patchValue(this.user.addresses![0]);
    this.confirmPassword = this.user.cod_user;
  }

  handleFileInput(event: any) {
    const file = event!.target!.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userPhoto = reader.result;
    };
  }

  compareFormValues() {
    return JSON.stringify(this.form.value) === JSON.stringify(this.originalForm.value);
  }

  comparePassword() {
    return this.form.value.cod_user === this.confirmPassword;
  }

  updateMessage() {
    switch (this.parameters.length) {
      case 0:
        this.message = '';
        break;
      case 1:
        this.message = `
          O seguinte parâmetro foi alterado:\n
          ${this.parameters[0]}
        `;
        break;
      default:
        this.message = `
          O seguintes parâmetros foram alterados:\n
          ${this.parameters.join(', ')}
        `;
    }
  }

  handleInputEvent(event: Event) {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const name = target.name;
      this.parameters.push(name);
      this.updateMessage();
      this.messageService.setMessage(this.message);
    }
    if (!this.compareFormValues()) {
      this.context.emit('isEdited');
    } else {
      this.context.emit('edit');
    }
  }
}
