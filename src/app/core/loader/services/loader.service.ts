import {
    ApplicationRef,
    ComponentRef,
    EnvironmentInjector,
    Inject,
    Injectable,
    Renderer2,
    RendererFactory2,
    createComponent,
    inject,
    signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LoaderComponent } from '../loader.component';

@Injectable()
export class LoaderService {
    public static loading = 0;
    private static _loaderComponentRef:
        | ComponentRef<LoaderComponent>
        | undefined;
    private _renderer: Renderer2;
    private readonly _isLoading = signal(false);
    public readonly isLoading = this._isLoading.asReadonly();

    constructor(
        private readonly _applicationRef: ApplicationRef,
        private readonly _environmentInjector: EnvironmentInjector,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._renderer = inject(RendererFactory2).createRenderer(null, null);
    }

    public loadStarted(): void {
        LoaderService.loading++;
        this._checkLoading();
    }

    public loadCompleted(): void {
        if (LoaderService.loading) {
            LoaderService.loading--;
        }

        this._checkLoading();
    }

    private _checkLoading(): void {

        if (LoaderService.loading) {
            this._isLoading.set(true);
            setTimeout(() => this._createLoaderComponent(), 150);
        } else {
            this._isLoading.set(false);
            setTimeout(() => this._destroyLoaderComponent(), 150);
        }

    }

    private _createLoaderComponent(): void {

        if (
            LoaderService._loaderComponentRef
            || !LoaderService.loading
        ) {
            return;
        }

        const loaderComponentRef = (LoaderService._loaderComponentRef =
            createComponent(LoaderComponent, {
                environmentInjector: this._environmentInjector,
            }));

        this._renderer.appendChild(
            this._document?.body,
            loaderComponentRef.location.nativeElement
        );

        this._applicationRef.attachView(loaderComponentRef.hostView);
    }

    private _destroyLoaderComponent(): void {

        if (
            !LoaderService._loaderComponentRef
            || LoaderService.loading
        ) {
            return;
        }

        LoaderService._loaderComponentRef.destroy();
        this._applicationRef.detachView(LoaderService._loaderComponentRef.hostView);
        LoaderService._loaderComponentRef = undefined;
    }
}
