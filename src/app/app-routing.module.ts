import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'test01',
        loadChildren: () =>
            import('./pages/test01/test01.module').then((m) => m.Test01Module),
    },
    {
        path: 'test02',
        loadChildren: () =>
            import('./pages/test02/test02.module').then((m) => m.Test02Module),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
