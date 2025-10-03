import { Component, OnInit } from '@angular/core';
import { ExportFileComponent } from './export-file.component';
import { NbDialogRef } from '@nebular/theme';

function click(id){
  const button = document.getElementById(id);
    if (button) {
      const event = new MouseEvent('click', { bubbles: true });
      button.dispatchEvent(event);
    }
    else console.debug("button not found")
}

@Component({
  selector: 'export-file-test',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileTestComponent extends ExportFileComponent implements OnInit {

  constructor(protected ref: NbDialogRef<ExportFileComponent>) {
    super(ref)
   }

   sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }



  async ngOnInit(): Promise<void> {

    /*<nb-option _ngcontent-jsi-c365="" value="snippet" _nghost-jsi-c197="" ng-reflect-value="snippet" tabindex="-1" id="nb-option-12" class="nb-transition selected"><!--bindings={
      "ng-reflect-ng-if": "false"
    }-->Snippet</nb-option>*/
    const nbSelect = document.getElementById('mode-select');

    if (nbSelect) {
      // Simula il clic su nb-select per aprire il menu a discesa
      click("mode-select");
      console.debug("clicked", nbSelect)
      await this.sleep(1000)

      click("nb-option-12");
      // Trova tutte le opzioni nb-option
      const options = nbSelect.getElementsByTagName('nb-option');

      if (options.length > 0) {
        // Simula il clic sulla prima opzione disponibile
        (options[0] as HTMLElement).click();
      }
      else console.debug("not found")

    }
    else console.debug("not found")
     this.mode="snippet"
    await this.sleep(1000)

    click("export-save");
    //this.ref.close()

  }

}
