import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { filterNullish } from 'src/app/utils/functions/filter-nullish.function';

import { EBirdRepository } from 'src/app/repositories/ebird/ebird.repository';
import { Bird } from 'src/app/repositories/ebird/interfaces/bird.interface';
import { Region } from 'src/app/repositories/ebird/interfaces/regions.interface';

/**
 * Recupera e armazena lista de pássaros recém observados na região
 * selecionada.
 *
 * Diferente do `EBirdTest02Service`, este Service utiliza Signals
 * sem encapsular a requisição em um método que receba parâmetros.
 * Ao invés disso, ele utiliza um signal para armazenar os parâmetros
 * (no caso apenas a Região).
 */
@Injectable()
export class EBirdTest01Service {
    private readonly _eBirdRepository = inject(EBirdRepository);

    /**
     * Signal que armazena região de pássaros observada.
     *
     * `undefined` como valor inicial como workaround para evitar
     * que a requisição de pássaros recém observados em X região (`recentObsBirds`)
     * seja efetuada logo que este Service é instânciado.
     */
    public readonly obsRegion = signal<Region | undefined>(undefined);

    /**
     * Signal que recupera e armazena lista de pássaros recém observados na região
     * armazenada no signal `obsRegion`.
     *
     * Este signal é reativo com as alterações de `obsRegion` e a requisição
     * é disparada toda vez que o signal `obsRegion` sofre alteração, dado que
     * utiliza a região como parâmetro para requisição.
     */
    public readonly recentObsBirds = toSignal(
        toObservable(this.obsRegion).pipe(  // Para tornar reativo as alterações de `obsRegion`.
            filterNullish<Region>(), // Para evitar que requisição seja efetuada logo que este Service é instânciado uma vez que a região inicialmente é `undefined`.
            switchMap((region) =>
                this._eBirdRepository.requestRecentObsBirds$(region, 3)
            )
        ),
        {
            manualCleanup: true,
            initialValue: [] as Array<Bird>,
        }
    );
}

