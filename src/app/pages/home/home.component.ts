import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../interfaces/user.interface';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  private subscription: Subscription = new Subscription();

  role = '';

  constructor(private readonly database: DatabaseService) {};

  async ngOnInit(): Promise<void> {
    this.subscription.add(interval(30000).subscribe(async () => {
      await this.getRole();
    }));
    await this.getRole();
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
