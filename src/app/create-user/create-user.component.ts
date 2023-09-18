import { User } from './../interafaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user = {} as User;
  newUser = {} as User;

  constructor(private bsModalRef: BsModalRef) { }

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

  cpfMask(event: any) {
    const value = event.target.value;
    const mask = '###.###.###-##';
    const maskedValue = this.applyMask(value, mask);
    event.target.value = maskedValue;
    this.validateCpf(this.newUser.registerNumber) ?
      this.newUser.registerNumber = maskedValue :
      this.newUser.registerNumber = '';
  }

  applyMask(value: any, mask: string) {
    const valueArray = value.split('');
    const maskArray = mask.split('');
    const result = [];
    let index = 0;
    for (let i = 0; i < maskArray.length; i++) {
      if (maskArray[i] === '#') {
        result.push(valueArray[index]);
        index++;
      } else {
        result.push(maskArray[i]);
      }
    }
    return result.join('');
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
}
