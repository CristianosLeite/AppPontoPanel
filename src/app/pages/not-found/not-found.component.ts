import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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
    private readonly usersService: UsersService
  ) { }
  @Input() param: string | null = null;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['Error']) {
        this.error = params['Error'];
        this.code = params['Code'];
        this.message = params['Message'];
        this.param = 'serverError';
      }
    });
    this.param = 'clientError'
  }

  reloadApplication() {
    this.usersService.logout();
  }
}
