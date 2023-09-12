import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-u-header',
  templateUrl: './u-header.component.html',
  styleUrls: ['./u-header.component.scss'],
})
export class UHeaderComponent {
  constructor(private tokenService: TokenService, private router: Router) {}

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
