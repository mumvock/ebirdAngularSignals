import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoaderService } from './core/loader/services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    constructor() {
        this._manageLazyLoadingLoader();
    }

    /**
     * Alterna exibição do loader para o `Lazy Loading` dos módulos.
     */
    private _manageLazyLoadingLoader(): void {
        const _router = inject(Router);
        const _loaderService = inject(LoaderService);

        _router.events
            .pipe(takeUntilDestroyed())
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
