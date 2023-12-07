import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  HelpDocumentModule,
  ProductDocsEntry,
  PurePipeModule,
  SafePipe,
  TranslateModule,
} from '@alauda-fe/common';

@Component({
  selector: 'alu-portal-footer',
  templateUrl: './template.html',
  styleUrls: ['styles.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HelpDocumentModule,
    TranslateModule,
    SafePipe,
    PurePipeModule,
  ],
})
export class ProductsPageFooterComponent {
  @Input()
  data: ProductDocsEntry;

  handleDocEntrypoint = (entrypoint: string) =>
    // FIXME: 应该后端修改 API
    entrypoint.replace('/console-platform/portal-docs/', '');
}
