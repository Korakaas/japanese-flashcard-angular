import { Component } from '@angular/core';
import { DailyStatsService } from 'src/app/_services/daily-stats.service';
import { DeckStats } from 'src/app/models/dailyStats.model';
import { Chart, registerables } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
Chart.register(...registerables);
@Component({
  selector: 'app-s-global',
  templateUrl: './s-global.component.html',
  styleUrls: ['./s-global.component.scss'],
})
export class SGlobalComponent {
  globalStats!: DeckStats[];
  totalFlashcardsReviewed: number = 0;
  totalCorrectAnswer: number = 0;
  deckId: string | null = '';
  flashcardsKnown: number = 0;
  flashcardsLearning: number = 0;
  flashcardsNew: number = 0;
  private destroy$!: Subject<boolean>;

  constructor(
    private dailyStatsService: DailyStatsService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content: 'Mes statistiques de révision du japonais globales',
    });
    this.setTitle('Mes stats-JapaneseFlashcard');
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();

    this.dailyStatsService
      .getUserStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: DeckStats[]) => {
        this.globalStats = data;
        console.log(this.globalStats);
        this.globalStats.forEach((deckStats) => {
          console.log(deckStats);
          if (deckStats.flashcards?.known)
            this.flashcardsKnown += deckStats.flashcards?.known;
          if (deckStats.flashcards?.learning)
            this.flashcardsLearning += deckStats.flashcards?.learning;
          if (deckStats.flashcards?.new)
            this.flashcardsNew += deckStats.flashcards?.new;

          deckStats.dailyStats?.forEach((dailyStat) => {
            if (dailyStat.reviewNumber)
              this.totalFlashcardsReviewed += dailyStat.reviewNumber;
            if (dailyStat.correctAnswer)
              this.totalCorrectAnswer += dailyStat.correctAnswer;
          });
        });

        this.renderChart();
      });
  }

  renderChart() {
    console.log(this.totalFlashcardsReviewed, this.totalCorrectAnswer);
    console.log(
      this.flashcardsKnown,
      this.flashcardsLearning,
      this.flashcardsNew
    );
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
            backgroundColor: ['rgba(255, 99,132,0.2)', 'rgba(0, 128, 0, 0.2) '],
          },
        ],
      },
    });
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
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
