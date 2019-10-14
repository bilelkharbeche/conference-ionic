import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../services/conference-service';
import { Speakers } from '../entities/speakers';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  listeNomPrenom: string[] = [];
  speakers: Speakers = new Speakers('', '');
  affichagePres = false;

  constructor(private dataService: ConferenceService) {}

  ngOnInit(): void {
    this.dataService.recupererSpeakers().subscribe(
      (speak) => {
        Object.values(speak).forEach(resultat => {
          this.listeNomPrenom.push(resultat.name);
        });
      });
  }

  afficherPresentateur(nom: string) {
    this.dataService.recupererSpeakers().subscribe(
      (pres) => {
        Object.values(pres).forEach(resultat => {
          if(resultat.name == nom) {
            this.affichagePres = true;
            this.speakers = resultat;
          }
        });
      });
  }
}
