import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {

  role = sessionStorage.getItem('role');

  constructor(private readonly database: DatabaseService) {};

  async ngOnInit(): Promise<void> {
    await this.getRole();
  }

  ngOnChanges(): void {
    sessionStorage.setItem('role', this.role!.toString());
    window.location.reload();
  }

  async getRole(): Promise<void> {
    try {
      await this.database.getUser().then((data: any) => {
        this.role = data.role;
      });
    } catch (error) {
      throw error;
    }
  }
}
