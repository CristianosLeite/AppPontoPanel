import { User } from '../../interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AddEmailComponent } from '../add-user-information/add-email/add-email.component';
import { AddAdressComponent } from '../add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from '../add-user-information/add-phone/add-phone.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  user = {} as User;
  newUser = {} as User;

  alert = {
    show: false,
    msg: '',
    type: '',
    success: false
  }

  constructor(
    private readonly modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {

  }

  saveUser() {
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  resetForm(userForm: NgForm) {
    userForm.resetForm();
  }

  checkCpf(cpf: Event) {
    const cpfInput = cpf.target as HTMLInputElement;
    if (!this.validateCpf(cpfInput.value)) {
      cpfInput.value = '';
    }
  }

  validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      alert('CPF inválido');
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      alert('CPF inválido');
      return false;
    }

    function calculateDigit(start: number, end: number, factor: number): number {
      let sum = 0;
      for (let i = start; i < end; i++) {
        sum += parseInt(cpf.charAt(i)) * factor;
        factor--;
      }
      let digit = 11 - (sum % 11);
      if (digit > 9) {
        digit = 0;
      }
      return digit;
    }

    const dig1 = calculateDigit(0, 9, 10);

    if (parseInt(cpf.charAt(9)) !== dig1) {
      alert('CPF inválido');
      return false;
    }

    const dig2 = calculateDigit(0, 10, 11);

    if (parseInt(cpf.charAt(10)) !== dig2) {
      alert('CPF inválido');
      return false;
    }

    return true;
  }

  createUser() {
    this.usersService.createUser(this.newUser)
      .then((response) => {
        if (response) {
          this.showAlert('success', 'Usuário criado com sucesso.');
        } else {
          this.showAlert('danger', 'Erro ao criar usuário.');
        }
      });
  }

  openEmailModal() {
    this.bsModalRef = this.modalService.show(AddEmailComponent);
  }

  openAddressModal() {
    this.bsModalRef = this.modalService.show(AddAdressComponent);
  }

  openPhoneModal() {
    this.bsModalRef = this.modalService.show(AddPhoneComponent);
  }

  showAlert(type: string, msg: string) {
    this.alert.show = true;
    this.alert.msg = msg;
    this.alert.type = type;

    setTimeout(() => {
      this.resetAlert();
    }, 5000);

    this.closeModal();
  }

  resetAlert() {
    this.alert.show = false;
    this.alert.msg = '';
    this.alert.type = '';
  }
}
