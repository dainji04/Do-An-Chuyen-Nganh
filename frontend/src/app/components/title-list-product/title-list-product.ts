import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-list-product',
  imports: [],
  templateUrl: './title-list-product.html',
})
export class TitleListProduct {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
