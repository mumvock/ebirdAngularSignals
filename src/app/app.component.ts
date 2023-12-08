import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { LoaderService } from './core/loader/services/loader.service';
import { BaseComponent } from './utils/abstracts/base.abstract';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent {

    constructor() {
        super();
        this._manageLazyLoadingLoader();
    }

    /**
     * Alterna exibição do loader para o `Lazy Loading` dos módulos.
     */
    private _manageLazyLoadingLoader(): void {
        const _router = inject(Router);
        const _loaderService = inject(LoaderService);

        _router.events
            .pipe(takeUntil(this.$onDestroy))
            .subscribe(event => {

                if (event instanceof RouteConfigLoadStart) {
                    _loaderService.loadStarted();
                }

                if (event instanceof RouteConfigLoadEnd) {
                    _loaderService.loadCompleted();
                }
            });
    }
}
