import { Component, OnInit } from '@angular/core';
import { ApiErrorService } from './_subjects/api-error.service';
import { ApiSuccessService } from './_subjects/api-success.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'japanese-flashcard-angular';
  message: string = '';
  display: boolean = false;

  constructor(
    private apiErrorService: ApiErrorService,
    private apiSuccesService: ApiSuccessService
  ) {}

  ngOnInit(): void {
    this.apiErrorService.apiError.subscribe((data: string) => {
      this.message = data;
      this.display = true;
    });
    this.apiSuccesService.apiSuccess.subscribe((data: string) => {
      this.message = data;
      this.display = true;
    });
  }

  clearMsg(): void {
    this.message = '';
    this.display = false;
  }
}
