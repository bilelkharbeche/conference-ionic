import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../services/conference-service';
import { Session } from '../entities/session';
import { IonTextarea } from '@ionic/angular';
import { Plugins, CameraResultType } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Speakers } from '../entities/speakers';

const { Camera } = Plugins;
defineCustomElements(window);

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  listeTitles: string[] = [];
  session: Session = new Session('', '');
  speakers: Speakers = new Speakers('', '');
  affichageSession = false;
  affichageNote = false;
  notesString: string;
  noteId: string;
  photoId: string;
  photo: SafeResourceUrl;

  constructor(private dataService: ConferenceService, private sanitizer: DomSanitizer) { }

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
            this.noteId = 'note' + resultat.id;
            this.photoId = 'photo' + resultat.id;
          }
        });
      });
  }

  afficherNote() {
    this.affichageSession = false;
    this.affichageNote = true;
    this.notesString = localStorage.getItem(this.noteId);
    this.photo = localStorage.getItem(this.photoId);
  }

  enregistrerNote(notes: IonTextarea) {
    localStorage.setItem(this.noteId, notes.value);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    localStorage.setItem(this.photoId, image.dataUrl);
  }
}
