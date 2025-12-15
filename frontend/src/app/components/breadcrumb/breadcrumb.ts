import { Component, Input } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [NzBreadCrumbModule, RouterLink],
  template: `
    <nz-breadcrumb>
      @for(item of items; track $index) {
      <nz-breadcrumb-item class="cursor-pointer">
        <a
          [style]="$index == items.length - 1 ? 'color: #0033ffcf;' : ''"
          [routerLink]="item.url"
          >{{ item.label }}</a
        >
      </nz-breadcrumb-item>
      }
    </nz-breadcrumb>
  `,
})
export class Breadcrumb {
  @Input() items: Array<{ label: string; url?: string }> = [];
}
