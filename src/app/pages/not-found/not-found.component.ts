import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  error = 'Página não encontrada';
  code = 404;
  message = 'A página que você está procurando não existe, foi removida ou está temporáriamente indisponível';

  constructor(private route: ActivatedRoute) {}
  @Output() param = new EventEmitter<string>();

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['Error']) {
        this.error = params['Error'];
        this.code = params['Code'];
        this.message = params['Message'];
        this.param.emit('serverError');
      }
    });
  }
}
