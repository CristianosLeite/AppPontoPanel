import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'src/app/services/message.service';
import { ImageService } from 'src/app/services/image.service';

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

  /**
   * @description Formulário editável pelo usuário.
   * @default Usuário logado
  */
  form = new FormGroup({
    user_id: new FormControl('', Validators.required),
    company_id: new FormControl('', Validators.required),
    cod_user: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    profile_picture: new FormControl(Blob, Validators.required),
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

  /**
   * @description Formulário original, usado para comparar com o formulário atual.
   * @default Usuário logado
  */
  originalForm = new FormGroup({
    user_id: new FormControl('', Validators.required),
    company_id: new FormControl('', Validators.required),
    cod_user: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    profile_picture: new FormControl('', Validators.required),
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
    private messageService: MessageService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.user;
    this.form.patchValue(this.user);
    this.form.patchValue(this.user.addresses![0]);
    this.originalForm.patchValue(this.user);
    this.originalForm.patchValue(this.user.addresses![0]);
    this.confirmPassword = this.user.cod_user;
  }

  public readFileAndSetUserPhoto(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.userPhoto = e.target!.result;
      let blob = new Blob([new Uint8Array(this.userPhoto as ArrayBuffer)], { type: 'image/jpeg' });
      let readerBlob = new FileReader();
      readerBlob.readAsArrayBuffer(blob);

      this.imageService.updateProfilePicture(this.user.user_id, blob).then(() => {
        this.messageService.setMessage('Foto de perfil atualizada com sucesso.');
      }).catch(() => {
        this.messageService.setMessage('Erro ao atualizar a foto de perfil.');
      });
    };

    reader.readAsDataURL(file);
  }

  private compareFormValues(): boolean {
    return JSON.stringify(this.form.value) === JSON.stringify(this.originalForm.value);
  }

  private comparePassword(): boolean {
    return this.form.value.cod_user === this.confirmPassword;
  }

  private updateMessage(): void {
    const parameterCount = this.parameters.length;

    switch (parameterCount) {
      case 0:
        this.message = '';
        break;
      case 1:
        this.message = `O seguinte parâmetro foi alterado:\n${this.parameters[0]}`;
        break;
      default:
        this.message = `O seguintes parâmetros foram alterados:\n${this.parameters.join(', ')}`;
    }
  }

  private updateFormComparison(): void {
    if (!this.compareFormValues()) {
      this.context.emit('isEdited');
    } else {
      this.parameters = [];
      this.context.emit('edit');
    }
  }

  /**
   * @description Método chamado quando o usuário altera o valor de um campo do formulário.
   * @param event
  */
  public handleInputEvent(event: Event): void {
    if (!event.target) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const name = target.name;

    this.updateFormComparison();

    if (this.parameters.includes(name)) {
      return;
    }

    this.parameters.push(name);

    this.updateFormComparison();
    this.updateMessage();
    this.messageService.setMessage(this.message);
  }

  /**
   * @description Método chamado quando o usuário altera a foto de perfil.
   * @param event
  */
  public handleFileInput(event: Event): void {
    if (!event.target) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const name = target.name;

    this.updateFormComparison();

    if (this.parameters.includes(name)) {
      return;
    }

    this.parameters.push(name);

    const targetFiles = target.files as FileList;

    for (let i = 0; i < targetFiles.length; i++) {
      const file = targetFiles[0];

      // Verifica se o arquivo é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('O arquivo selecionado não é válido.');
        target.value = '';
        return;
      }

      // Verifica se o arquivo é maior que 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert('O arquivo selecionado é muito grande.');
        target.value = '';
        return;
      }

      this.readFileAndSetUserPhoto(file);
    }

    this.updateFormComparison();
    this.updateMessage();
  }
}
