import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderInterceptor } from './services/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './loader.component';

@NgModule({
    declarations: [LoaderComponent],
    providers: [
        LoaderService,
        LoaderInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
    ],
})
export class LoaderModule {}
