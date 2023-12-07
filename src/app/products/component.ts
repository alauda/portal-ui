import { IconModule } from '@alauda/ui';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { get, orderBy } from 'lodash-es';
import { BehaviorSubject, of, catchError, finalize, map } from 'rxjs';

import { ProductsPageFooterComponent } from './footer/component';

import {
  ProductEntry,
  publishRef,
  TRUE,
  PRODUCT_ICON_MAP,
  PageModule,
  PageHeaderModule,
  TranslateModule,
  PurePipeModule,
  ImgHeaderPipe,
  SafePipe,
  ProductDocsEntry,
  PlatformUIService,
} from '@alauda-fe/common';

const CARD_MARGIN = 10;
const CARD_MAX_WIDTH = 325;

@Component({
  templateUrl: 'template.html',
  styleUrls: ['styles.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PageModule,
    PageHeaderModule,
    TranslateModule,
    PurePipeModule,
    IconModule,
    ImgHeaderPipe,
    SafePipe,
    ProductsPageFooterComponent,
  ],
})
export class ProductsPageComponent {
  private readonly platformUI = inject(PlatformUIService);

  PRODUCT_ICON_MAP = PRODUCT_ICON_MAP;

  entriesLoading$$ = new BehaviorSubject(true);
  entriesLoadingError$$ = new BehaviorSubject(false);

  allEntries$ = this.platformUI.getEntries().pipe(
    map(entries =>
      orderBy(
        entries.filter(
          item =>
            item.spec.packType !== 'AdminPage' &&
            (!item.status || item.status.hiddenOnPortal !== true),
        ),
        item => item.status?.orderOnMenu,
      ),
    ),
    catchError(() => {
      this.entriesLoadingError$$.next(true);
      return of([]);
    }),
    finalize(() => {
      this.entriesLoading$$.next(false);
    }),
    publishRef(),
  );

  productDocsEntry$ = this.platformUI.getDocsEntry().pipe(publishRef());

  bg$ = this.platformUI.getBackgroundImages().pipe(publishRef());

  platformInfo$ = this.platformUI.getPlatformInfo().pipe(publishRef());

  gotoProduct(entry: ProductEntry) {
    const hasQuery = entry.spec.entrypoint.includes('?');
    window.open(
      entry.spec.ssoEnabled
        ? `${entry.spec.entrypoint}${
            hasQuery ? '&' : '?'
          }id_token=${window.localStorage.getItem('id_token')}`
        : entry.spec.entrypoint,
      '_blank',
    );
  }

  showDocs(resource: ProductDocsEntry) {
    return (
      get(resource, ['metadata', 'annotations', 'hiddenOnPortal']) !== TRUE
    );
  }

  /**
   * 原理：计算出恰好包裹卡片容器的最大宽度，然后利用 margin: 0 auto 实现整体居中。
   * 布局规则：要求卡片自身宽度在区间（265, 325）之间，当设置屏幕足够宽时可以最多放下 6 个最小宽度卡片。
   * 例如：1、当卡片数量大于 5 时，此时容器宽度为 1754 即 calcCardContainerMaxWidth(5)，此时也同时放下 6 个最小宽度卡片 1748。
   *      2、当卡片数量小于 5 时，就按当前卡片数量（以最大宽度）填充满时计算出容器宽度。
   *
   * 注意：这种方式简单，但是依赖于 grid 布局的填充 auto-fit 填充方式。因为 auto-fit 方式 item 宽度会自适应的填充满容器，但是 auto-fill 不会。
   * 例如：当页面足够宽，一行可以放下 4 个卡片（以最小宽度算）时，但是实际上只有 3 个卡片时，如果以 auto-fill 填充会空出一个卡片的位置，但是当使用 auto-fit 填充时，即便此时只有 3 个卡片，它依旧撑满容器。
   */
  getCardContainerMaxWidth(length: number) {
    // 计算出刚好包裹单个卡片最大宽度的容器最大宽度
    const calcCardContainerMaxWidth = (length: number) =>
      CARD_MAX_WIDTH * length + CARD_MARGIN * 2 * (length - 1);

    if (length > 4) {
      return calcCardContainerMaxWidth(4);
    }

    return calcCardContainerMaxWidth(length);
  }
}
