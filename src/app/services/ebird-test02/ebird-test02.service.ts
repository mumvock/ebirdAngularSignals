import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { EBirdRepository } from 'src/app/repositories/ebird/ebird.repository';
import { Bird } from 'src/app/repositories/ebird/interfaces/bird.interface';
import { Region } from 'src/app/repositories/ebird/interfaces/regions.interface';

/**
 * Recupera e armazena lista de pássaros recém observados na região
 * selecionada.
 *
 * Diferente do `EBirdTest01Service`, este Service encapsula a requisição
 * em um método que recebe parâmetros e atualiza a lista no
 * signal `recentObsBirds` pós requisição.
 */
@Injectable()
export class EBirdTest02Service {
    private readonly _eBirdRepository = inject(EBirdRepository);

    /**
     * Signal que armazena lista de pássaros recém observados na região.
     *
     * Este signal precisa que o método `updateRecentObsBirds` seja chamado
     * manualmente ao menos uma vez para ter a lista seja populada.
     */
    public readonly recentObsBirds = signal<Array<Bird>>([]);

    /**
     * Armazena última região selecionada para evitar requisições iguais.
     */
    private lastRegion: Region | undefined;

    /**
     * Recupera lista de pássaros recém observados na região alvo e
     * armazena no signal `recentObsBirds`.
     *
     * @param region região alvo selecionada.
     */
    public updateRecentObsBirds(region: Region): Signal<Array<Bird>> {

        if (this.lastRegion === region) { // Workaround para evitar que requisições iguais sejam feitas dado que não da pra usar o `distinctUntilChanged`.
            return this.recentObsBirds.asReadonly();
        }

        this.lastRegion = region;

        return toSignal(
            this._eBirdRepository
                .requestRecentObsBirds$(region, 3)
                .pipe(tap((birds) => this.recentObsBirds.set(birds))
            ),
            {
                manualCleanup: true,
                initialValue: [] as Array<Bird>,
            }
        );
    }

}
