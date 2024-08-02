import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'analog-discovery-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <analog-discovery-analog-welcome/>
  `,
})
export default class HomeComponent {
}
