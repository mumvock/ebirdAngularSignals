import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EBirdTest01Service } from './services/ebird-test01/ebird-test01.service';
import { Region } from './../../repositories/ebird/interfaces/regions.interface';

@Component({
    selector: 'app-test01',
    templateUrl: './test01.component.html',
    styleUrls: ['./test01.component.scss'],
    providers: [EBirdTest01Service],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Test01Component {
    private readonly _eBirdTest01Service = inject(EBirdTest01Service);

    protected readonly recentObsBirds = this._eBirdTest01Service.recentObsBirds;
    protected readonly obsRegion = this._eBirdTest01Service.obsRegion;

    protected setObsRegion(region: Region): void {
        this._eBirdTest01Service.obsRegion.set(region);
    }
}
