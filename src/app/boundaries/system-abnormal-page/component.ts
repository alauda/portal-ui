import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AbnormalPageModule, PageModule } from '@alauda-fe/common';

@Component({
  template: `
    <acl-page>
      <div *aclPageContent>
        <acl-abnormal-page></acl-abnormal-page>
      </div>
    </acl-page>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageModule, AbnormalPageModule],
})
export class SystemAbnormalPageComponent {}
