import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private route: Router, private meta: Meta, private title: Title) {
    this.meta.updateTag({
      name: 'description',
      content: "Page d'accueil de l'application JapaneseCArd",
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Japonais, Flashcard, SRS, Vocabulaire, Grammaire, Kanji',
    });
    this.setTitle('Accueil-JapaneseFlashcard');
  }

  goToDecks() {
    this.route.navigate(['/decks']);
  }
  goToUser() {
    this.route.navigate(['/user']);
  }

  private setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
