import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Test02Component } from './test02.component';

const routes: Routes = [
    {
        path: '',
        component: Test02Component,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Test02RoutingModule {}
