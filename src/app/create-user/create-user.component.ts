import { User } from './../interafaces/user.interface';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  user = {} as User;

  constructor(private bsModalRef: BsModalRef) {}

  saveUser() {
    // Here, you can send the user data to your backend API for processing.
    // Close the modal after saving the user.
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  // This method is used to reset the form values.
  resetForm(userForm: NgForm) {
    userForm.resetForm();
  }

  // This method is used to set the form values.
  setFormValues(userForm: NgForm) {
    userForm.setValue({
      userId: this.user.userId,
      companyId: this.user.companyId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      registerNumber: this.user.registerNumber,
      createdAt: this.user.createdAt,
    });
  }
}
