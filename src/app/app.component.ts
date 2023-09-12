import { Component, OnInit } from '@angular/core';
import { ApiErrorService } from './_subjects/api-error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'japanese-flashcard-angular';
  message: string = '';
  display: boolean = false;

  constructor(private apiErrorService: ApiErrorService) {}

  ngOnInit(): void {
    this.apiErrorService.apiError.subscribe((data: string) => {
      this.message = data;
      this.display = true;
    });
  }

  clearMsg(): void {
    this.message = '';
    this.display = false;
  }
}
