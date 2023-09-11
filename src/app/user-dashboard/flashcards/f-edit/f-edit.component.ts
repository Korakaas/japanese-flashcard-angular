import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f-edit',
  templateUrl: './f-edit.component.html',
  styleUrls: ['./f-edit.component.scss']
})
export class FEditComponent {
  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => console.log(data)
    )
  }
}
