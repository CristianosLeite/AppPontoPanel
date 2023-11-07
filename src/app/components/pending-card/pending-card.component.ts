import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pendings } from '../../interafaces/pendings.interface';
import { ApiServices } from '../../services/api-services.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-card',
  templateUrl: './pending-card.component.html',
  styleUrls: ['./pending-card.component.scss']
})
export class PendingCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  counter = 0;

  pendings = [] as Pendings[];

  constructor(private readonly apiServices: ApiServices) {
    this.subscription.add(interval(300000).subscribe(async () => { // Atualiza o componente a cada 5 minutos.
      await this.getPending();
      this.checkForPendings();
    }));
  }

  async ngOnInit(): Promise<void> {
    await this.getPending();
    this.checkForPendings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkForPendings() {
    this.counter = 0;
    this.pendings.forEach(pending => {
      if (pending.status === 'pending') {
        this.counter++;
      }
    });
  }

  async getPending() {
    await this.apiServices.getSelfPendings().then((response: Pendings[]) => {
      this.pendings = response;
    });
  }
}
