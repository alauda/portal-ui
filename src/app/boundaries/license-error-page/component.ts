import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  LicenseErrorModule,
  PageHeaderModule,
  ProductEntryName,
} from '@alauda-fe/common';

@Component({
  template: `
    <acl-license-error>
      <acl-page-header
        [currentProduct]="currentProduct"
        [isPlatform]="false"
      ></acl-page-header>
    </acl-license-error>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LicenseErrorModule, PageHeaderModule],
})
export class LicenseErrorPageComponent {
  currentProduct = ProductEntryName.PLATFORM;
}
