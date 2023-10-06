import { Component } from '@angular/core';
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
    private activated: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    console.log('hello');
    const deckId = this.activated.snapshot.paramMap.get('deckId');
    if (deckId)
      this.dailyStatsService
        .getDeckStats(deckId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: DeckStats) => {
          this.deckStats = data;
          console.log(this.deckStats);
          console.log(this.deckStats);
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
