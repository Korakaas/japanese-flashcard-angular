import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-p-header',
  templateUrl: './p-header.component.html',
  styleUrls: ['./p-header.component.scss'],
})
export class PHeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private tokeService: TokenService) {}

  ngOnInit(): void {
    this.isLogged = this.tokeService.isLogged();
  }
}
