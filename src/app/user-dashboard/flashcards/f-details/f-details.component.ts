import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f-details',
  templateUrl: './f-details.component.html',
  styleUrls: ['./f-details.component.scss']
})
export class FDetailsComponent {
  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => console.log(data)
    )
  }
}
