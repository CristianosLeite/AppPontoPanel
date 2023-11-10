import { Component, OnInit, OnDestroy } from '@angular/core';
import { Solicitation } from 'src/app/interfaces/solicitations.interface';
import { ApiServices } from 'src/app/services/api-services.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-solicitation-card',
  templateUrl: './solicitation-card.component.html',
  styleUrls: ['./solicitation-card.component.scss']
})
export class SolicitationCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  counter = 0;

  solicitations = [] as Solicitation[];

  constructor(private readonly api: ApiServices) { }

  async ngOnInit(): Promise<void> {
    this.subscription.add(interval(300000).subscribe(async () => { // Atualiza o componente a cada 5 minutos.
      await this.getSolicitations();
      this.checkForSolicitations();
    }));
    console.log(this.solicitations);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkForSolicitations() {
    this.counter = 0;
    this.solicitations.forEach(solicitation => {
      if (solicitation.status === 'pending') {
        this.counter++;
      }
    });
  }

  async getSolicitations() {
    await this.api.getSelfSolicitations().then((response: Solicitation[]) => {
      this.solicitations = response;
    });
  }
}
