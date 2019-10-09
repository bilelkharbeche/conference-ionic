import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../services/conference-service';
import { Session } from '../entities/session';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  listeTitles: string[] = [];
  session: Session = new Session('', '');
  affichageSession = false;

  constructor(private dataService: ConferenceService) { }

  ngOnInit(): void {
    this.dataService.recupererSession().subscribe(
      (sessions) => {
        Object.values(sessions).forEach(resultat => {
          if (resultat.titleMobile) {
            this.listeTitles.push(resultat.titleMobile);
          } else {
            this.listeTitles.push(resultat.title);
          }
        });
      });
  }

  afficherSession(titre: string) {
    this.dataService.recupererSession().subscribe(
      (sessions) => {
        Object.values(sessions).forEach(resultat => {
          if (resultat.title === titre || resultat.titleMobile === titre) {
            this.affichageSession = true;
            this.session = resultat;
          }
        });
      });
  }
}
