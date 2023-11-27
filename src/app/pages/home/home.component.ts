import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../interfaces/user.interface';
import { Subscription, interval } from 'rxjs';
import { NotFoundService } from 'src/app/services/not-found.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  private subscription: Subscription = new Subscription();

  role = '';

  constructor(private readonly database: DatabaseService, private readonly notFound: NotFoundService) {};

  ngOnInit(): void {
    this.database.getUser().then(user => {
      this.role = user.role
    }).catch(() => {
      console.log('Usuário não autenticado.');
      this.notFound.notFound.emit('clientError');
    });
  }

  ngOnChanges(): void {
    window.location.reload();
  }

  async getRole(): Promise<void> {
    try {
      await this.database.getUser().then((data: User) => {
        this.role = data.role;
      });
    } catch (error) {
      throw error;
    }
  }
}
