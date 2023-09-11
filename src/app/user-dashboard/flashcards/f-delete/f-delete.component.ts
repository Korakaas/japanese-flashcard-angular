import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f-delete',
  templateUrl: './f-delete.component.html',
  styleUrls: ['./f-delete.component.scss']
})
export class FDeleteComponent {
  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => console.log(data)
    )
  }
}
