import { Component, OnInit } from '@angular/core';
import { ApiErrorService } from './_subjects/api-error.service';
import { ApiSuccessService } from './_subjects/api-success.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  messageError: string = '';
  messageSuccess: string = '';
  displayError: boolean = false;
  displaySuccess: boolean = false;

  constructor(
    private apiErrorService: ApiErrorService,
    private apiSuccesService: ApiSuccessService
  ) {}

  ngOnInit(): void {
    this.apiErrorService.apiError.subscribe((data: string) => {
      this.messageError = data;
      this.displayError = true;
      this.clearMessagesAfterTimeout();
    });
    this.apiSuccesService.apiSuccess.subscribe((data: string) => {
      this.messageSuccess = data;
      this.displaySuccess = true;
      this.clearMessagesAfterTimeout();
    });
  }

  clearMsgError(): void {
    this.messageError = '';
    this.displayError = false;
  }

  clearMsgSuccess(): void {
    this.messageSuccess = '';
    this.displaySuccess = false;
  }

  /**
   * cache le toast après 5 secondes
   */
  private clearMessagesAfterTimeout(): void {
    setTimeout(() => {
      this.displayError = false;
      this.displaySuccess = false;
    }, 5000);
  }
}
