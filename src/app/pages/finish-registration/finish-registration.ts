import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end-user-resgistration',
  templateUrl: './finish-registration.html',
  styleUrls: ['./finish-registration.scss']
})
export class FinishRegistration implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)],),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  user = {} as User;
  token = '';

  alert = {
    show: false,
    msg: '',
    type: '',
    success: false
  }

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  updateUser() {
    const validationResult = this.validateForm();
    if (!validationResult.isValid) {
      this.showAlert('danger', validationResult.message);
      return;
    }

    const passwordMatch = this.comparePasswords();
    if (!passwordMatch) {
      this.showAlert('danger', 'As senhas não coincidem.');
      return;
    }

    this.user.cod_user = this.form.value.password!.toString();

    this.usersService.updatePassword(this.user, this.token)
      .then((response) => {
        if (response) {
          this.showAlert('success', 'Senha atualizada com sucesso.');
          this.alert.success = true;
        } else {
          this.showAlert('danger', 'Erro ao atualizar a senha.');
        }
      });
  }

  validateForm() {
    return {
      isValid: this.form.valid,
      message: 'A senha deve conter no mínimo seis caracteres.'
    };
  }

  comparePasswords() {
    return this.form.value.password === this.form.value.confirmPassword;
  }

  showAlert(type: string, msg: string) {
    this.alert.show = true;
    this.alert.msg = msg;
    this.alert.type = type;

    setTimeout(() => {
      this.resetAlert();
    }, 5000);
  }

  resetAlert() {
    this.alert.show = false;
    this.alert.msg = '';
    this.alert.type = '';
  }

  goToLogin() {
    window.location.href = '/#';
  }
}
