import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';

import { Region } from './interfaces/regions.interface';
import { Bird } from './interfaces/bird.interface';

@Injectable({
    providedIn: 'root'
})
export class EBirdRepository {
    private readonly _httpClient = inject(HttpClient);

    public requestRecentObsBirds$(region: Region, maxResults: number): Observable<Array<Bird>> {
        return this._httpClient
            .get<Array<Bird>>(
                `https://api.ebird.org/v2/data/obs/${region}/recent`,
                {
                    headers: new HttpHeaders({ ['x-ebirdapitoken']: 'pl2ms637a80n' }),
                    params: new HttpParams({ fromObject: { maxResults } })
                }
            )
            .pipe(first());
    }

}
