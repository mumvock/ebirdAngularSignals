import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Region } from './../../repositories/ebird/interfaces/regions.interface';
import { EBirdTest02Service } from './services/ebird-test02/ebird-test02.service';

@Component({
    selector: 'app-test02',
    templateUrl: './test02.component.html',
    styleUrls: ['./test02.component.scss'],
    providers: [EBirdTest02Service],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Test02Component {
    private readonly _eBirdTest02Service = inject(EBirdTest02Service);

    protected readonly recentObsBirds = this._eBirdTest02Service.recentObsBirds;
    protected readonly obsRegion = signal<Region | undefined>(undefined); // Só existe pois vai ser usado no template, implica na comparação entre o Test 01 e o Test 02.

    protected setObsRegion(region: Region): void {
        this._eBirdTest02Service.updateRecentObsBirds(region);
        this.obsRegion.set(region);
    }
}
