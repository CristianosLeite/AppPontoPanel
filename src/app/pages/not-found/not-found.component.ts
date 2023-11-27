import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotFoundService } from '../../services/not-found.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  error = 'Página não encontrada';
  code = 404;
  message = 'A página que você está procurando não existe, foi removida ou está temporáriamente indisponível';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly service: NotFoundService
    ) {}
  @Input() param = new EventEmitter<string>();

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['Error']) {
        this.error = params['Error'];
        this.code = params['Code'];
        this.message = params['Message'];
        this.param.emit('serverError');
      }
    });
    this.service.notFound.subscribe((param: string) => {
      this.param.emit(param);
    });
  }

  reloadApplication() {
    window.location.href = '/#';
    window.location.reload();
  }
}
