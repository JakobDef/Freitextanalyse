import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  form: FormGroup;
  input: any;

  constructor(){
    this.form = new FormGroup({
      anrede: new FormControl<string>('', [Validators.required]),
      sex: new FormControl<string>('', [Validators.required]),
      type: new FormControl<string>('', Validators.required)
    });
  }

  get anrede() {
    return this.form.get('anrede');
  }

  get sex() {
    return this.form.get('anrede');
  }

  get type() {
    return this.form.get('anrede');
  }

  async wordlistErstellen() {
    let inputEdited = this.input.replace(/[^a-zA-ZäöüÄÖÜß\n\r ]/g, "");
    var wordlist = [];
    wordlist = inputEdited.split(/[\s\n\r]+/);
    wordlist.sort();

    // var mail = `Anrede: ${this.anrede}\nGeschlecht: ${this.sex}\nAuswertungstyp: ${this.type}\n\n`;
    var mail = "";

    for(var z = 0; z < wordlist.length; z++){

        mail += wordlist[z] + "\n";

    }

    this.copyToClipboard(mail);

    if(confirm("Deine Wortliste wurde kopiert. Durch das Klicken des Buttons wird dein Mail-Programm geöffnet. Bitte füge in die Mail, die dann angezeigt wird, mit Strg + V (Windows) bzw. cmd + V (MacOS) die Wortliste ein und sende die Mail an die gegebene Email-Adresse!")){
      var Anrede = "Liebes Quod.X® - Team, %0d%0aanbei die Rohdaten meiner Reflexion mit der Bitte um Auswertung.%0d%0aSchöne Grüße!%0d%0a%0d%0a%0d%0a%0d%0a"
      window.location.href = "mailto:freitextanalyse@quodx.com?subject=Datenexport - Reflexion" + "&body=" + Anrede
    }

    // let alert = await this.alertcontroller.create({
    //   header: "Alles erledigt!",
    //   subHeader: "Deine Wortliste wurde kopiert. Durch das Klicken des Buttons wird dein Mail-Programm geöffnet. Bitte füge in die Mail, die dann angezeigt wird mit Strg + V (Windows) bzw. cmd + V (MacOS X) die Wortliste ein und sende die Mail an die gegebene Email-Adresse!",
    //   buttons: [
    //     {
    //       text: 'Okay',
    //       id: 'confirm-button',
    //       handler: () => {
    //         var Anrede = "Liebes Quod.X® - Team, %0d%0aanbei die Rohdaten meiner Reflexion mit der Bitte um Auswertung.%0d%0aSchöne Grüße!%0d%0a%0d%0a%0d%0a%0d%0a"
    //         window.location.href = "mailto:freitextanalyse@quodx.com?subject=Datenexport - Reflexion" + "&body=" + Anrede
    //       }
    //     }
    //   ]
    // });
    // alert.present();
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
