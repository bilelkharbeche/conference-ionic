import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../services/conference-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  dateDebut: string;
  dateFin: string;

  constructor(private dataService: ConferenceService) { }

  ngOnInit(): void {
    this.dataService.recupererConf().subscribe(
      (dates) => {
        if (localStorage.getItem('DateDebut') && localStorage.getItem('DateFin')) {
          this.dateDebut = localStorage.getItem('DateDebut');
          this.dateFin = localStorage.getItem('DateFin');
        } else {
          this.dateDebut = dates[0].date;
          this.dateFin = dates[1].date;
          localStorage.setItem('DateDebut', this.dateDebut);
          localStorage.setItem('DateFin', this.dateFin);
        }
      });
  }
}
