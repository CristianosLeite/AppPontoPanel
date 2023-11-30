import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-warning-prompt',
  templateUrl: './warning-prompt.component.html',
  styleUrls: ['./warning-prompt.component.scss']
})
export class WarningPromptComponent implements OnInit {
  @Input() message?: string;

  constructor(
    private readonly modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.message = this.messageService.messageReceived;
    this.messageService.message.subscribe((message: string) => {
      this.message = message;
    });
  }

  openModal(template: TemplateRef<any>, message?: string) {
    this.message = message;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.bsModalRef.hide();
  }

  decline(): void {
    this.bsModalRef.hide();
  }
}
