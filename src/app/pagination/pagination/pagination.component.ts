import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['currentPage']?.currentValue) ||
      (changes['totalPages']?.currentValue)
    ) {
      this.pages = this.getPages(this.currentPage, this.totalPages);
    }
  }

  public pages: number[] = [];

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }
  public onNext(): void {
    this.next.emit(this.currentPage);
  }
  public onPrevious(): void {
    this.previous.next(this.currentPage);
  }

  private getPages(current: number, totalPages: number): number[] {
    if (totalPages <= 7) {
      return [...Array(totalPages).keys()].map(x => ++x)
    }

    if (current > 5) {
      if (current >= totalPages - 4) {
        return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
      } else {
        return [1, -1, current - 1, current, current + 1, -1, totalPages]
      }
    }

    return [1, 2, 3, 4, 5, -1, totalPages]
  }
}
