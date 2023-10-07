import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private route: Router) {}

  goToDecks() {
    this.route.navigate(['/decks']);
  }
  goToUser() {
    this.route.navigate(['/user']);
  }
}
