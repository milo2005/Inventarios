import { Component } from '@angular/core';
import { NavService } from './services/_index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public nav: NavService) { }

}
