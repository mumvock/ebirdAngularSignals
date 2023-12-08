import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Test01Component } from './test01.component';

const routes: Routes = [
    {
        path: '',
        component: Test01Component,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Test01RoutingModule {}
