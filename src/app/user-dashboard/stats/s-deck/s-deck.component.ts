import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { DailyStatsService } from 'src/app/_services/daily-stats.service';
import { DeckStats } from 'src/app/models/dailyStats.model';
Chart.register(...registerables);

@Component({
  selector: 'app-s-deck',
  templateUrl: './s-deck.component.html',
  styleUrls: ['./s-deck.component.scss'],
})
export class SDeckComponent {
  deckStats!: DeckStats;
  totalFlashcardsReviewed: number = 0;
  totalCorrectAnswer: number = 0;
  deckId: string | null = '';
  flashcardsKnown: number = 0;
  flashcardsLearning: number = 0;
  flashcardsNew: number = 0;
  private destroy$!: Subject<boolean>;

  constructor(
    private dailyStatsService: DailyStatsService,
    private activated: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content: 'Mes statistiques de révision du japonais par paquet',
    });
    this.setTitle('Mes stats par parquet-JapaneseFlashcard');
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    const deckId = this.activated.snapshot.paramMap.get('deckId');
    if (deckId)
      this.dailyStatsService
        .getDeckStats(deckId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: DeckStats) => {
          this.deckStats = data;
          if (this.deckStats.flashcards?.known)
            this.flashcardsKnown += this.deckStats.flashcards?.known;
          if (this.deckStats.flashcards?.learning)
            this.flashcardsLearning += this.deckStats.flashcards?.learning;
          if (this.deckStats.flashcards?.new)
            this.flashcardsNew += this.deckStats.flashcards?.new;

          this.deckStats.dailyStats?.forEach((dailyStat) => {
            if (dailyStat.reviewNumber)
              this.totalFlashcardsReviewed += dailyStat.reviewNumber;
            if (dailyStat.correctAnswer)
              this.totalCorrectAnswer += dailyStat.correctAnswer;
          });

          this.renderChart();
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  
  /**
   * Génère les stats sous forme de camembert
   */
  private renderChart(): void {
    if (this.totalFlashcardsReviewed) {
      const piechartAnswer = new Chart('piechartAnswer', {
        type: 'pie',
        data: {
          labels: ['Mauvaises réponses', 'Bonnes réponses'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [
                this.totalFlashcardsReviewed - this.totalCorrectAnswer,
                this.totalCorrectAnswer,
              ],
              backgroundColor: [
                'rgba(255, 99,132,0.2)',
                'rgba(0, 128, 0, 0.2) ',
              ],
            },
          ],
        },
      });
    }

    if (this.flashcardsKnown || this.flashcardsLearning || this.flashcardsNew) {
      const piechartLevel = new Chart('piechartLevel', {
        type: 'pie',
        data: {
          labels: ['Connu', 'En apprentissage', 'Nouvelle'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [
                this.flashcardsKnown,
                this.flashcardsLearning,
                this.flashcardsNew,
              ],
              backgroundColor: [
                'rgba(255, 99,132,0.2)',
                'rgba(0, 128, 0, 0.2) ',
                ' rgba(0, 0, 255, 0.2)',
              ],
            },
          ],
        },
      });
    }
  }

  private setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
