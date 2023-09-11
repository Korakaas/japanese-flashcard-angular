import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-details',
  templateUrl: './d-details.component.html',
  styleUrls: ['./d-details.component.scss']
})
export class DDetailsComponent {
  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => console.log(data)
    )
  }
}
