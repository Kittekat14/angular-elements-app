import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-elements-app';
  content: SafeHtml | undefined;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    // injector: used to configure this new Element => connecting it to services of rest of our App (deps injection)
    const AlertElement = createCustomElement(AlertComponent, { injector });

    customElements.define('custom-alert', AlertElement);

    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml(
        '<custom-alert message="Rendered Dynamically"></custom-alert>'
      );
    }, 1000);
  }
}
