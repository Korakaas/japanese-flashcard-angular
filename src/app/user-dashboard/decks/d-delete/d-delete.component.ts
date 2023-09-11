import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-delete',
  templateUrl: './d-delete.component.html',
  styleUrls: ['./d-delete.component.scss']
})
export class DDeleteComponent {
  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => console.log(data)
    )
  }
}
