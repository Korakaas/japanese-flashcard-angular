import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-s-deck',
  templateUrl: './s-deck.component.html',
  styleUrls: ['./s-deck.component.scss']
})
export class SDeckComponent {
  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => console.log(data)
    )
  }
}
