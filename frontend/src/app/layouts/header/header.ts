import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  imports: [NzIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
