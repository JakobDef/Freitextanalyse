import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  input: string;
  sex: string;
  anrede: string;
  type: string;

  constructor(private alertcontroller: AlertController) { }

  ngOnInit() {
  }

  async wordlistErstellen(){
    let inputEdited = this.input.replace(/[^a-zA-ZäöüÄÖÜß\n\r ]/g, "");
    var wordlist = [];
    wordlist = inputEdited.split(/[\s\n\r]+/);
    wordlist.sort();

    var mail = `Anrede: ${this.anrede}\nGeschlecht: ${this.sex}\nAuswertungstyp: ${this.type}\n`;

    for(var z = 0; z < wordlist.length; z++){

        mail += wordlist[z] + "\n";

    }

    this.copyToClipboard(mail);

    let alert = await this.alertcontroller.create({
      header: "Alles erledigt!",
      subHeader: "Deine Wortliste wurde kopiert. Durch das Klicken des Buttons wird dein Mail-Programm geöffnet. Bitte füge in die Mail, die dann angezeigt wird mit Strg + V (Windows) bzw. cmd + V (MacOS X) die Wortliste ein und sende die Mail an die gegebene Email-Adresse!",
      buttons: [
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            var Anrede = "Liebes Quod.X® - Team, %0d%0aanbei die Rohdaten meiner Reflexion mit der Bitte um Auswertung.%0d%0aSchöne Grüße!%0d%0a%0d%0a%0d%0a%0d%0a"
            window.location.href = "mailto:freitextanalyse@quodx.com?subject=Datenexport - Reflexion" + "&body=" + Anrede
          }
        }
      ]
    });
    alert.present();

  }

  copyToClipboard(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


}
